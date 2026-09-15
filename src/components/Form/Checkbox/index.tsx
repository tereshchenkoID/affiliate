'use client'

import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
  useState,
} from 'react'
import clsx from 'clsx'
import { Check } from 'lucide-react'

import { runRules, type ValidationRule } from '@/helpers/rules'

import style from './index.module.scss'

import type { UISize, UIToggleValue } from '@/types/ui'

export type CheckboxSize = Extract<UISize, '1' | '2' | '3'>

const iconSizes: Record<CheckboxSize, number> = {
  '1': 12,
  '2': 16,
  '3': 20,
}

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'checked' | 'placeholder' | 'size'> {
  data: UIToggleValue
  placeholder?: string
  children?: ReactNode
  size?: CheckboxSize
  onChange?: (value: UIToggleValue) => void
  isDisabled?: boolean
  onValidate?: (error: string | null) => void
  rules?: ValidationRule[]
  error?: ReactNode | null
  className?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
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
      className={clsx(
        style.block,
        style[`size-${size}`],
        {
          [style.disabled]: isDisabled,
          [style.error]: showError,
          [style.checked]: isChecked,
        },
        className
      )}
    >
      <label htmlFor={inputId} className={style.label}>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={style.input}
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          aria-invalid={showError || undefined}
          {...rest}
        />
        <span className={style.item}>
          <Check size={iconSizes[size]} className={style.icon} />
        </span>
        {
          content &&
          <span className={style.text}>{content}</span>
        }
      </label>
    </div>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
