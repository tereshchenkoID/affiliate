'use client'

import React, {
  type ChangeEvent,
  type FocusEvent,
  forwardRef,
  type ReactNode,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'

import { runRules, type ValidationRule } from '@/helpers/rules'

import Icon from '@/components/Overlay/Icon'

import style from './index.module.scss'

export interface FieldProps {
  id?: string
  type?: string
  visibility?: boolean
  data?: string | number | null
  placeholder?: string
  onChange?: (value: string) => void
  onValidate?: (error: string | null) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  className?: string
  isDisabled?: boolean
  isRequired?: boolean
  isClear?: boolean
  rules?: ValidationRule[]
  min?: string | number | null
  max?: string | number | null
  error?: ReactNode
  success?: ReactNode
}

const Field = forwardRef<HTMLInputElement, FieldProps>(({
  id,
  type = 'text',
  visibility = false,
  data = '',
  placeholder,
  onChange,
  onValidate,
  onBlur: externalOnBlur,
  className,
  isDisabled = false,
  isRequired = false,
  isClear = true,
  rules = [],
  min = null,
  max = null,
  error = null,
  success = null,
}, ref) => {
  const generatedId = useId()
  const inputId = id || generatedId
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [focused, setFocused] = useState<boolean>(false)
  const [touched, setTouched] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value
    onChange?.(val)

    const err = runRules(val, rules)
    onValidate?.(err)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    setFocused(false)
    setTouched(true)

    const stringData = data !== null && data !== undefined ? String(data) : ''
    const err = runRules(stringData, rules)
    onValidate?.(err)

    if (!err && Boolean(data)) {
      externalOnBlur?.(e)
    }
  }

  const handleClear = (): void => {
    onChange?.('')

    const err = runRules('', rules)
    onValidate?.(err)

    inputRef.current?.focus()
  }

  const isFilled = data !== null && data !== undefined && data !== ''
  const isLabelActive = focused || isFilled || type === 'date'
  const showError = Boolean(error) && (touched || isFilled)
  const showSuccess = !showError && Boolean(success) && isFilled

  const inputType = visibility && type === 'password'
    ? (show ? 'text' : 'password')
    : type

  return (
    <div
      className={
        clsx(
          style.block,
          {
            [style.disabled]: isDisabled,
            [style.focused]: isLabelActive,
            [style.password]: visibility,
            [style.error]: showError,
          },
          className
        )
      }
    >
      <div className={style.wrapper}>
        <input
          ref={inputRef}
          id={inputId}
          type={inputType}
          className={style.input}
          value={data ?? ''}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          required={isRequired}
          min={min ?? undefined}
          max={max ?? undefined}
          autoComplete="off"
          disabled={isDisabled}
        />
        <label
          htmlFor={inputId}
          className={style.label}
          onClick={() => inputRef.current?.focus()}
        >
          {placeholder}
          {isRequired && <span>*</span>}
        </label>
        <div className={style.options}>
          {
            (Boolean(data) && !isDisabled && isClear) &&
            <button
              type="button"
              className={style.clear}
              onClick={handleClear}
              aria-label="Clear"
              title="Clear"
            >
              <Icon name="x" size="16" />
            </button>
          }
          {
            visibility && type === 'password' &&
            <button
              type="button"
              className={style.eye}
              onClick={() => setShow((prev) => !prev)}
              aria-label="Visibility"
              title="Visibility"
            >
              <Icon
                name={show ? 'eye' : 'eye-off'}
                size="16"
              />
            </button>
          }
        </div>
      </div>
      {
        showError &&
        <p className={clsx(style.message, style.error)}>{error}</p>
      }
      {
        showSuccess &&
        <p className={clsx(style.message, style.success)}>{success}</p>
      }
    </div>
  )
})

Field.displayName = 'Field'

export default Field
