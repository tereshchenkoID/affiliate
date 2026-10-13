'use client'

import React, {
  useCallback, useLayoutEffect, useRef, useState
} from 'react'
import { createPortal } from 'react-dom'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { useOutsideClick } from '@/hooks/useOutsideClick'
import { runRules } from '@/helpers/rules'

import Action from '@/components/Form/Action'
import Box from '@/components/Layout/Box'
import Icon from '@/components/Overlay/Icon'
import Text from '@/components/Typography/Text'

import style from './index.module.scss'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  type?: string
  data?: SelectOption[]
  value?: SelectOption | null
  placeholder?: string
  onChange?: (option: SelectOption) => void
  onValidate?: (error: string | null) => void
  className?: string
  isDisabled?: boolean
  isRequired?: boolean
  isSearch?: boolean
  rules?: Array<(val: unknown) => string | null>
  error?: string | null
}

interface DropdownCoords {
  top: number
  left: number
  width: number
  isTop: boolean
  maxHeight: number
}

const Select: React.FC<SelectProps> = ({
  type = 'text',
  data = [],
  value = null,
  placeholder,
  onChange,
  onValidate,
  className,
  isDisabled = false,
  isRequired = false,
  isSearch = true,
  rules = [],
  error = null,
}) => {
  const t = useTranslations()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [toggle, setToggle] = useState(false)
  const [search, setSearch] = useState('')
  const [touched, setTouched] = useState(false)

  const [coords, setCoords] = useState<DropdownCoords>({
    top: 0,
    left: 0,
    width: 0,
    isTop: false,
    maxHeight: 280,
  })

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const spaceBelow = viewportHeight - rect.bottom
    const spaceAbove = rect.top

    const DEFAULT_MAX_HEIGHT = 280
    const GAP = 6

    const opensTop = spaceBelow < 200 && spaceAbove > spaceBelow
    const availableSpace = opensTop ? spaceAbove - GAP - 16 : spaceBelow - GAP - 16
    const calculatedMaxHeight = Math.min(DEFAULT_MAX_HEIGHT, Math.max(120, availableSpace))

    setCoords({
      top: opensTop
        ? rect.top + window.scrollY - GAP
        : rect.bottom + window.scrollY + GAP,
      left: rect.left + window.scrollX,
      width: rect.width,
      isTop: opensTop,
      maxHeight: calculatedMaxHeight,
    })
  }, [])

  useLayoutEffect(() => {
    if (!toggle) return

    updatePosition()

    const handleScrollOrResize = () => updatePosition()
    window.addEventListener('scroll', handleScrollOrResize, true)
    window.addEventListener('resize', handleScrollOrResize)

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true)
      window.removeEventListener('resize', handleScrollOrResize)
    }
  }, [toggle, updatePosition])

  useOutsideClick(
    [triggerRef, dropdownRef],
    () => {
      if (!toggle) return
      setToggle(false)
      setSearch('')
      setTouched(true)

      const valToCheck = value?.value !== undefined ? String(value.value) : ''
      const err = runRules(valToCheck, rules)
      onValidate?.(err)
    },
    toggle
  )

  const handleSelectOption = (option: SelectOption) => {
    onChange?.(option)
    setSearch('')
    setToggle(false)
    setTouched(true)

    const valToCheck = option?.value !== undefined ? String(option.value) : ''
    const err = runRules(valToCheck, rules)
    onValidate?.(err)
  }

  const handleToggle = () => {
    if (isDisabled) return
    setToggle((prev) => !prev)
  }

  const filters = isSearch && search
    ? data.filter((el) => el?.label?.toLowerCase().includes(search.toLowerCase()))
    : data

  const isChosen = Boolean(value && (value.label || value.value))
  const showError = Boolean(error && (touched || isChosen))

  return (
    <div
      className={
        clsx(
          style.block,
          {
            [style.disabled]: isDisabled,
            [style.active]: toggle,
            [style.chosen]: isChosen,
            [style.error]: showError,
          },
          className
        )
      }
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={placeholder || t('select_value')}
        className={style.selected}
        onClick={handleToggle}
        disabled={isDisabled}
      >
        <label className={style.label}>
          {placeholder}
          {isRequired && <span>*</span>}
        </label>

        <span className={style.default}>{value?.label || t('select_value')}</span>
        <Icon name="chevron-down" size="16" className={style.arrow} />
      </button>
      {
        toggle &&
        typeof window !== 'undefined' &&
        createPortal(
          <Box
            ref={dropdownRef}
            display="flex"
            direction="column"
            className={style.dropdown}
            style={{
              position: 'absolute',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: `${coords.width}px`,
              transform: coords.isTop ? 'translateY(-100%)' : 'none',
              zIndex: 9999,
            }}
          >
            {
              isSearch &&
              <Box
                p="1"
                flexShrink="0"
                className={style.head}
              >
                <input
                  type={type}
                  value={search}
                  className={style.input}
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  autoComplete="off"
                />
              </Box>
            }
            <Box
              display="flex"
              direction="column"
              gap="half"
              p="1"
              flexGrow="1"
              className={style.list}
              style={{ maxHeight: `${coords.maxHeight}px` }}
            >
              {
                filters.length > 0 ?
                  filters.map((el, idx) => {
                    const isSelected = value?.value === el?.value || value?.label === el?.label
                    return (
                      <Action
                        key={idx}
                        justify="start"
                        color={isSelected ? 'primary' : 'transparent'}
                        active={isSelected}
                        onClick={() => handleSelectOption(el)}
                      >
                        {el?.label}
                      </Action>
                    )
                  })
                :
                  <Box p="2">
                    <Text size="3" className={style.empty}>{t('empty')}: <strong>&#34;{search}&#34;</strong></Text>
                  </Box>
              }
            </Box>
          </Box>,
          document.body
        )}
      {
        showError &&
        <p className={clsx(style.message, style.error)}>{error}</p>
      }
    </div>
  )
}

export default Select
