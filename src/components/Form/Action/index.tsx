'use client'

import {
  type ButtonHTMLAttributes,
  type ElementType,
  forwardRef,
  type MouseEvent,
  type ReactNode,
} from 'react'
import clsx from 'clsx'
import { Loader } from 'lucide-react'

import { Link } from '@/i18n/navigation'

import style from './index.module.scss'

import { UIColor, UISize } from '@/types/ui'

export interface ActionProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'> {
  to?: string | object
  type?: 'button' | 'submit' | 'reset'
  as?: ElementType
  size?: Extract<UISize, '1' | '2' | '3' | '4' | '5'>
  color?: UIColor
  loading?: boolean
  disabled?: boolean
  active?: boolean
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
  children,
  className,
  onClick,
  ...rest
}, ref) => {
  const Tag = to ? Link : (as || 'button')
  const isDisabled = disabled || loading

  const classNames = clsx(
    style.block,
    style[`size-${size}`],
    style[`color-${color}`],
    {
      [style.loading]: loading,
      [style.active]: active,
      [style.disabled]: disabled,
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

  const getElementProps = () => {
    const baseProps = {
      ...rest,
      ref,
      className: classNames,
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
          <Loader className={style.icon} />
        </span>
      }
    </Tag>
  )
})

Action.displayName = 'Button'

export default Action
