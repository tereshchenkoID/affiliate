'use client'

import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
  useState,
} from 'react'
import clsx from 'clsx'

import { runRules, type ValidationRule } from '@/helpers/rules'

import style from './index.module.scss'

import { UISize, UIToggleValue } from '@/types/ui'

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'checked' | 'placeholder' | 'size'> {
  data: UIToggleValue
  placeholder?: string
  children?: ReactNode
  size?: Extract<UISize, '1' | '2' | '3'>
  onChange?: (value: UIToggleValue) => void
  isDisabled?: boolean
  onValidate?: (error: string | null) => void
  rules?: ValidationRule[]
  error?: ReactNode | null
  className?: string
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  data = '0',
  placeholder,
  children,
  size = '2',
  onChange,
  isDisabled = false,
  onValidate,
  rules = [],
  error = null,
  className,
  id,
  ...rest
}, ref) => {
  const generatedId = useId()
  const inputId = id || generatedId
  const [touched, setTouched] = useState(false)

  const isChecked = data === '1'

  const handleChange = () => {
    if (isDisabled) return

    const nextValue: UIToggleValue = isChecked ? '0' : '1'

    onChange?.(nextValue)
    setTouched(true)

    const err = runRules(nextValue, rules)
    onValidate?.(err)
  }

  const showError = Boolean(error && touched)
  const content = children ?? placeholder

  return (
    <div
      className={
        clsx(
          style.block,
          style[`size-${size}`],
          {
            [style.disabled]: isDisabled,
            [style.error]: showError,
            [style.checked]: isChecked,
          },
          className
        )
      }
    >
      <label
        htmlFor={inputId}
        className={style.label}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          className={style.input}
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          aria-checked={isChecked}
          aria-invalid={showError || undefined}
          {...rest}
        />
        <span className={style.track}>
          <span className={style.thumb} />
        </span>
        {
          content &&
          <span className={style.text}>{content}</span>
        }
      </label>
    </div>
  )
})

Switch.displayName = 'Switch'

export default Switch
