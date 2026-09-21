'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'

import style from './index.module.scss'

import {
  UITypographyAlign, UITypographyColor, UITypographyElements, UITypographySize, UITypographyTransform, UITypographyWeight
} from '@/types/ui'

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: UITypographyElements
  size?: UITypographySize
  weight?: UITypographyWeight
  align?: UITypographyAlign
  color?: UITypographyColor
  transform?: UITypographyTransform,
  children?: ReactNode
  className?: string
}

const Text = forwardRef<HTMLElement, TextProps>(({
  as: Tag = 'p',
  size = '5',
  weight = 'regular',
  align = 'start',
  transform,
  color = 'default',
  children,
  className,
  ...rest
}, ref) => {
  return (
    <Tag
      ref={ref as any}
      className={
        clsx(
          style.block,
          style[`size-${size}`],
          style[`weight-${weight}`],
          style[`color-${color}`],
          align && style[`align-${align}`],
          transform && style[`transform-${transform}`],
          className
        )
      }
      {...rest}
    >
      {children}
    </Tag>
  )
})

Text.displayName = 'Text'

export default Text
