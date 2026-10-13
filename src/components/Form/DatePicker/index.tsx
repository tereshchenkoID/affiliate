'use client'

import React, {
  startTransition, useEffect, useMemo, useRef, useState
} from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { useOutsideClick } from '@/hooks/useOutsideClick'

import Action from '@/components/Form/Action'
import Box from '@/components/Layout/Box'
import Grid from '@/components/Layout/Grid'
import Icon from '@/components/Overlay/Icon'
import Separator from '@/components/Overlay/Separator'
import Text from '@/components/Typography/Text'

import style from './index.module.scss'

export type DateRange = {
  from: Date | null
  to: Date | null
}

interface PresetOption {
  key: string
  label: string
  getRange: () => DateRange
}

const MONTH_NAMES = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
const WEEK_DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const isSameDay = (d1: Date | null, d2: Date | null): boolean => {
  if (!d1 || !d2) return false
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

const isBetween = (date: Date, start: Date | null, end: Date | null): boolean => {
  if (!start || !end) return false
  const t = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime()
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime()
  const min = Math.min(s, e)
  const max = Math.max(s, e)
  return t > min && t < max
}

const formatDate = (d: Date): string => {
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${mm}/${dd}/${d.getFullYear()}`
}

const getCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1)
  let dayOfWeek = firstDay.getDay() - 1
  if (dayOfWeek === -1) dayOfWeek = 6

  const startDate = new Date(year, month, 1 - dayOfWeek)
  const days: { date: Date; isCurrentMonth: boolean }[] = []

  for (let i = 0; i < 42; i++) {
    const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i)
    days.push({
      date: d,
      isCurrentMonth: d.getMonth() === month
    })
  }
  return days
}

const getPresets = (): PresetOption[] => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const subDays = (d: Date, days: number) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate() - days)

  return [
    { key: 'today', label: 'today', getRange: () => ({ from: today, to: today }) },
    { key: 'yesterday', label: 'yesterday', getRange: () => { const y = subDays(today, 1); return { from: y, to: y } } },
    { key: 'last7', label: 'last_7_days', getRange: () => ({ from: subDays(today, 6), to: today }) },
    { key: 'last30', label: 'last_30_days', getRange: () => ({ from: subDays(today, 29), to: today }) },
    {
      key: 'thisMonth',
      label: 'this_month',
      getRange: () => ({
        from: new Date(today.getFullYear(), today.getMonth(), 1),
        to: new Date(today.getFullYear(), today.getMonth() + 1, 0)
      })
    },
    {
      key: 'prevMonth',
      label: 'previous_month',
      getRange: () => ({
        from: new Date(today.getFullYear(), today.getMonth() - 1, 1),
        to: new Date(today.getFullYear(), today.getMonth(), 0)
      })
    },
    { key: 'last365', label: 'last_365_days', getRange: () => ({ from: subDays(today, 364), to: today }) },
    {
      key: 'thisYear',
      label: 'this_year',
      getRange: () => ({
        from: new Date(today.getFullYear(), 0, 1),
        to: new Date(today.getFullYear(), 11, 31)
      })
    },
    {
      key: 'prevYear',
      label: 'previous_year',
      getRange: () => ({
        from: new Date(today.getFullYear() - 1, 0, 1),
        to: new Date(today.getFullYear() - 1, 11, 31)
      })
    }
  ]
}

const findPresetKey = (r: DateRange, presetsList: PresetOption[]): string | null => {
  if (!r.from || !r.to) return null
  const found = presetsList.find((p) => {
    const pr = p.getRange()
    return isSameDay(r.from, pr.from) && isSameDay(r.to, pr.to)
  })
  return found ? found.key : null
}

interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange) => void
}

export const DatePicker: React.FC<DateRangePickerProps> = ({ value, onChange }) => {
  const t = useTranslations()
  const presets = useMemo(() => getPresets(), [])
  const todayDate = useMemo(() => new Date(), [])
  const [isOpen, setIsOpen] = useState(false)

  const initialRange = useMemo(() => {
    if (value) return value
    const defaultPreset = presets.find((p) => p.key === 'last30')
    return defaultPreset ? defaultPreset.getRange() : { from: null, to: null }
  }, [value, presets])

  const [range, setRange] = useState<DateRange>(initialRange)
  const [pendingRange, setPendingRange] = useState<DateRange>(initialRange)

  const initialMonth = range.from || new Date()
  const [currentYear, setCurrentYear] = useState(initialMonth.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(initialMonth.getMonth())

  const wrapperRef = useRef<HTMLDivElement>(null)

  useOutsideClick(wrapperRef, () => setIsOpen(false), isOpen)

  useEffect(() => {
    if (value) {
      startTransition(() => {
        setRange(value)
        setPendingRange(value)
      })
    }
  }, [value])

  const handleToggleOpen = () => {
    if (!isOpen) {
      setPendingRange(range)
      const d = range.from || new Date()
      setCurrentYear(d.getFullYear())
      setCurrentMonth(d.getMonth())
    }
    setIsOpen(!isOpen)
  }

  const nextMonthDate = new Date(currentYear, currentMonth + 1, 1)
  const rightYear = nextMonthDate.getFullYear()
  const rightMonth = nextMonthDate.getMonth()

  const leftDays = useMemo(() => getCalendarDays(currentYear, currentMonth), [currentYear, currentMonth])
  const rightDays = useMemo(() => getCalendarDays(rightYear, rightMonth), [rightYear, rightMonth])

  const handlePrevMonth = () => {
    const prev = new Date(currentYear, currentMonth - 1, 1)
    setCurrentYear(prev.getFullYear())
    setCurrentMonth(prev.getMonth())
  }

  const handleNextMonth = () => {
    const next = new Date(currentYear, currentMonth + 1, 1)
    setCurrentYear(next.getFullYear())
    setCurrentMonth(next.getMonth())
  }

  const handlePresetSelect = (preset: PresetOption) => {
    const newRange = preset.getRange()
    setRange(newRange)
    setPendingRange(newRange)
    onChange?.(newRange)
  }

  const handleDateClick = (day: Date) => {
    let nextRange: DateRange

    if (!pendingRange.from || (pendingRange.from && pendingRange.to)) {
      nextRange = { from: day, to: null }
    } else {
      if (day.getTime() < pendingRange.from.getTime()) {
        nextRange = { from: day, to: pendingRange.from }
      } else {
        nextRange = { from: pendingRange.from, to: day }
      }
    }

    setPendingRange(nextRange)
  }

  const handleApply = () => {
    setRange(pendingRange)
    onChange?.(pendingRange)
    setIsOpen(false)
  }

  const activePresetKey = findPresetKey(isOpen ? pendingRange : range, presets)
  const appliedPresetKey = findPresetKey(range, presets)

  const triggerLabel = useMemo(() => {
    const matched = presets.find((p) => p.key === appliedPresetKey)
    if (matched) return t(matched.label)

    if (range.from && range.to) {
      if (isSameDay(range.from, range.to)) return formatDate(range.from)
      return `${formatDate(range.from)} – ${formatDate(range.to)}`
    }
    if (range.from) return formatDate(range.from)
    return t('select_dates')
  }, [presets, t, range.from, range.to, appliedPresetKey])

  const renderMonth = (
    year: number,
    month: number,
    days: { date: Date; isCurrentMonth: boolean }[],
    showPrev = false,
    showNext = false
  ) => (
    <div className={style.month}>
      <Box
        display="flex"
        justify="between"
        align="center"
        mb="4"
      >
        {
          showPrev
            ?
              <Action
                size="1"
                color="primary"
                onClick={handlePrevMonth}
                square={true}
              >
                <Icon name="chevron-left" size="16" />
              </Action>
            :
              <div className={style.placeholder} />
        }
        <Text size="5" weight="bold">{t(MONTH_NAMES[month])} {year}</Text>
        {
          showNext
            ?
              <Action
                size="1"
                color="primary"
                onClick={handleNextMonth}
                square={true}
              >
                <Icon name="chevron-right" size="16" />
              </Action>
            :
              <div className={style.placeholder} />
        }
      </Box>
      <Grid
        display="grid"
        columns="7"
        gapY="1"
      >
        {
          WEEK_DAYS.map((day) =>
            <Text
              key={day}
              size="2"
              color="gray"
              align="center"
              weight="bold"
              transform="uppercase"
            >
              {t(day)}
            </Text>
          )
        }
        {
          days.map(({ date, isCurrentMonth }, idx) => {
            const isStart = isCurrentMonth && isSameDay(date, pendingRange.from)
            const isEnd = isCurrentMonth && isSameDay(date, pendingRange.to)
            const inRange = isCurrentMonth && isBetween(date, pendingRange.from, pendingRange.to)
            const isToday = isCurrentMonth && isSameDay(date, todayDate)

            return (
              <div
                key={idx}
                className={
                  clsx(
                    style.cell,
                    {
                      [style.range]: inRange,
                      [style.start]: isStart,
                      [style.end]: isEnd,
                    }
                  )
                }
              >
                <button
                  type="button"
                  disabled={!isCurrentMonth}
                  onClick={() => isCurrentMonth && handleDateClick(date)}
                  className={
                    clsx(
                      style.day,
                      {
                        [style.disabled]: !isCurrentMonth,
                        [style.selected]: isStart || isEnd,
                        [style.today]: isToday,
                      }
                    )
                  }
                >
                  {date.getDate()}
                </button>
              </div>
            )
          })
        }
      </Grid>
    </div>
  )

  // TODO Add Resize style

  return (
    <div
      className={style.block}
      ref={wrapperRef}
    >
      <button
        type="button"
        className={
          clsx(
            style.trigger,
            {
              [style.open]: isOpen
            }
          )
        }
        onClick={handleToggleOpen}
      >
        <Icon
          name="calendar-days"
          size="16"
          className={style.icon}
        />
        <span>{triggerLabel}</span>
        <Icon
          name="chevron-down"
          size="16"
          className={style.arrow}
        />
      </button>
      {
        isOpen &&
        <div className={style.dropdown}>
          <Box
            display="flex"
            gap="6"
          >
            {renderMonth(currentYear, currentMonth, leftDays, true, false)}
            {renderMonth(rightYear, rightMonth, rightDays, false, true)}
          </Box>
          <Separator color="muted" orientation="vertical" />
          <Box
            display="flex"
            direction="column"
            gap="half"
          >
            {
              presets.map((p) =>
                <Action
                  key={p.key}
                  size="1"
                  color={activePresetKey === p.key ? 'primary' : 'muted'}
                  onClick={() => handlePresetSelect(p)}
                >
                  {t(p.label)}
                </Action>
              )
            }
            <Box my="2">
              <Separator color="muted" />
            </Box>
            <Action
              full={true}
              size="1"
              color="primary"
              onClick={handleApply}
            >
              <Icon name="check" size="16" />
              {t('apply_now')}
            </Action>
          </Box>
        </div>
      }
    </div>
  )
}

export default DatePicker
