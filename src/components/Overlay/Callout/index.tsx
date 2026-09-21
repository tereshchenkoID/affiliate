import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  type LucideIcon,
} from 'lucide-react'

import style from './index.module.scss'

import type { UIColor, UISize } from '@/types/ui'

const DEFAULT_ICONS: Record<UIColor, LucideIcon> = {
  muted: Info,
  default: Info,
  primary: Info,
  gray: Info,
  transparent: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
}

export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  color?: UIColor
  size?: Extract<UISize, '1' | '2' | '3'>
  icon?: LucideIcon | ReactNode | false
  children?: ReactNode
  className?: string
}

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(({
  color = 'primary',
  size = '2',
  icon,
  children,
  className,
  ...rest
}, ref) => {
  const renderIcon = () => {
    if (icon === false) return null

    const IconComponent = (icon as LucideIcon) || DEFAULT_ICONS[color]

    return (
      <IconComponent className={style.icon} />
    )
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={
        clsx(
          style.block,
          style[`color-${color}`],
          style[`size-${size}`],
          className
        )
      }
      {...rest}
    >
      {renderIcon()}
      <div className={style.content}>{children}</div>
    </div>
  )
})

Callout.displayName = 'Callout'

export default Callout
