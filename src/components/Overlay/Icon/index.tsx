import React, { FC } from 'react'
import * as LucideIcons from 'lucide-react'
import { LucideProps } from 'lucide-react'

export interface IconProps extends Omit<LucideProps, 'ref'> {
  name?: string
}

const Icon: FC<IconProps> = ({ name, size = 24, className, ...props }) => {
  if (!name) return null

  const pascalName = name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[pascalName]

  if (!IconComponent) {
    const FallbackIcon = LucideIcons.HelpCircle
    return <FallbackIcon size={size} className={className} {...props} />
  }

  return <IconComponent size={size} className={className} {...props} />
}

export default Icon
