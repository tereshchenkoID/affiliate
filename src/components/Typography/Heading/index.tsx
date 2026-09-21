'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'

import style from './index.module.scss'

import {
  UITypographyAlign, UITypographyColor, UITypographySize, UITypographyWeight
} from '@/types/ui'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: UITypographySize
  weight?: UITypographyWeight
  align?: UITypographyAlign
  color?: UITypographyColor
  children?: ReactNode
  className?: string
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({
  as: Tag = 'h1',
  size = '7',
  weight = 'bold',
  align = 'start',
  color = 'default',
  children,
  className,
  ...rest
}, ref) => {
  return (
    <Tag
      ref={ref}
      className={
        clsx(
          style.block,
          style[`size-${size}`],
          style[`weight-${weight}`],
          style[`color-${color}`],
          align && style[`align-${align}`],
          className
        )
      }
      {...rest}
    >
      {children}
    </Tag>
  )
})

Heading.displayName = 'Heading'

export default Heading
