'use client'

import {
  type ButtonHTMLAttributes,
  type ElementType,
  forwardRef,
  type MouseEvent,
  type ReactNode,
} from 'react'
import clsx from 'clsx'

import { Link } from '@/i18n/navigation'

import Icon from '@/components/Overlay/Icon'

import style from './index.module.scss'

import { UIBoxJustify, UIColor, UISize } from '@/types/ui'

export interface ActionProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'> {
  to?: string | object
  type?: 'button' | 'submit' | 'reset'
  as?: ElementType
  size?: Extract<UISize, '1' | '2' | '3' | '4' | '5'>
  color?: UIColor
  square?: boolean
  aspectRatio?: string | number
  loading?: boolean
  disabled?: boolean
  active?: boolean
  justify?: UIBoxJustify
  full?: boolean
  children?: ReactNode
  className?: string
}

const Action = forwardRef<HTMLElement, ActionProps>(({
  to,
  type = 'button',
  as,
  size = '2',
  color = 'primary',
  loading = false,
  disabled = false,
  active = false,
  square,
  aspectRatio,
  justify = 'center',
  full,
  children,
  className,
  style: styleProp,
  onClick,
  ...rest
}, ref) => {
  const Tag = to ? Link : (as || 'button')
  const isDisabled = disabled || loading

  const classNames = clsx(
    style.block,
    style[`size-${size}`],
    style[`color-${color}`],
    style[`justify-${justify}`],
    {
      [style.loading]: loading,
      [style.active]: active,
      [style.disabled]: disabled,
      [style.square]: square,
      [style.full]: full,
    },
    className
  )

  const ariaLabel = typeof children === 'string' ? children : undefined

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (isDisabled) {
      e.preventDefault()
      return
    }
    onClick?.(e as MouseEvent<HTMLButtonElement>)
  }

  const computedStyle = {
    ...styleProp,
    ...(aspectRatio && { aspectRatio: String(aspectRatio) }),
  }

  const getElementProps = () => {
    const baseProps = {
      ...rest,
      ref,
      className: classNames,
      style: computedStyle,
      onClick: handleClick,
      'aria-label': rest['aria-label'] || ariaLabel,
    }

    if (to) {
      return {
        ...baseProps,
        href: to,
        ...(isDisabled && {
          'aria-disabled': true,
          tabIndex: -1,
        }),
      }
    }

    if (Tag === 'button') {
      return {
        ...baseProps,
        type,
        disabled: isDisabled,
      }
    }

    return {
      ...baseProps,
      ...(isDisabled && { 'aria-disabled': true }),
    }
  }

  return (
    <Tag {...getElementProps()}>
      <span
        className={
          clsx(
            style.content,
            {
              [style.hidden]: loading
            }
          )
        }
      >
        {children}
      </span>
      {
        loading &&
        <span className={style.spinner}>
          <Icon name="loader" className={style.icon} />
        </span>
      }
    </Tag>
  )
})

Action.displayName = 'Button'

export default Action
