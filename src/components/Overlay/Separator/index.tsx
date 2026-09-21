import { CSSProperties, forwardRef, type HTMLAttributes } from 'react'
import clsx from 'clsx'

import style from './index.module.scss'

import { UIColor } from '@/types/ui'

export interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical'
  size?: '1' | '2' | '3'
  color?: UIColor
  customColor?: string
  decorative?: boolean
}

const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  (
    {
      color = 'default',
      customColor,
      orientation = 'horizontal',
      size = '1',
      decorative = true,
      style: externalStyle,
      className,
      ...props
    },
    ref
  ) => {
    const customStyles: CSSProperties = {
      ...externalStyle,
      ...(customColor && { backgroundColor: customColor }),
    }

    return (
      <hr
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        data-color={!customColor ? color : undefined}
        aria-orientation={decorative ? undefined : orientation}
        data-orientation={orientation}
        data-size={size}
        style={customStyles}
        className={
          clsx(
            style.separator,
            className
          )
        }
        {...props}
      />
    )
  }
)

Separator.displayName = 'Separator'

export default Separator
