'use client'

import React, {
  type AnchorHTMLAttributes,
  type ElementType,
  forwardRef,
  type ReactNode,
} from 'react'
import clsx from 'clsx'

import { Link as NavigationLink } from '@/i18n/navigation'

import style from './index.module.scss'

import {
  UITypographyAlign, UITypographyColor, UITypographySize, UITypographyWeight
} from '@/types/ui'

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color' | 'href'> {
  href?: string | object
  as?: ElementType
  size?: UITypographySize
  weight?: UITypographyWeight
  align?: UITypographyAlign
  color?: UITypographyColor
  disabled?: boolean
  children?: ReactNode
  className?: string
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({
  href,
  as,
  size = '3',
  weight = 'regular',
  align,
  color = 'primary',
  disabled = false,
  children,
  className,
  onClick,
  ...rest
}, ref) => {
  const isExternal = typeof href === 'string' && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'))
  const Tag = as || (href && !isExternal ? NavigationLink : 'a')

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    onClick?.(e)
  }

  const externalProps = isExternal
    ? { target: rest.target || '_blank', rel: rest.rel || 'noopener noreferrer' }
    : {}

  return (
    <Tag
      ref={ref as any}
      href={disabled ? undefined : href}
      className={
        clsx(
          style.block,
          style[`color-${color}`],
          style[`size-${size}`],
          style[`weight-${weight}`],
          align && style[`align-${align}`],
          {
            [style.disabled]: disabled,
          },
          className
        )
      }
      onClick={handleClick}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : rest.tabIndex}
      {...externalProps}
      {...rest}
    >
      {children}
    </Tag>
  )
})

Link.displayName = 'Link'

export default Link
