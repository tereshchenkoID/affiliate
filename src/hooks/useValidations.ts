import { useTranslations } from 'next-intl'

export type ValidationRule = (value: unknown) => string | null

type NormalizedValue = string

const normalize = (value: unknown): NormalizedValue => {
  if (value === null || value === undefined) return ''
  if (typeof value === 'object' && 'value' in value) {
    const obj = value as { value?: unknown }
    return obj.value != null ? String(obj.value) : ''
  }
  return String(value)
}

const normalizeDate = (day: string | number | Date): Date => {
  const date = new Date(day)
  date.setHours(0, 0, 0, 0)
  return date
}

const getAge = (date: Date, today: Date): number => {
  let age = today.getFullYear() - date.getFullYear()
  const monthDiff = today.getMonth() - date.getMonth()

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < date.getDate())
  ) {
    age--
  }

  return age
}

export const useValidations = () => {
  const t = useTranslations()

  return {
    required: (msg = 'errors.field_required'): ValidationRule => (value) => {
      if (value === '0') return t(msg)
      return normalize(value).trim() ? null : t(msg)
    },

    email: (
      regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      msg = 'errors.format_email'
    ): ValidationRule => (value) => {
      const v = normalize(value).trim()
      if (!v) return null

      return regex.test(v) ? null : t(msg)
    },

    phone: (msg = 'errors.format_phone'): ValidationRule => (value) => {
      const v = normalize(value).replace(/\s|-/g, '')
      if (!v) return null
      const regex = /^\+?\d{7,15}$/
      return regex.test(v) ? null : t(msg)
    },

    adult: (minAge = 18): ValidationRule => (value) => {
      const v = normalize(value)
      if (!v) return null
      const birthDate = normalizeDate(v)

      if (isNaN(birthDate.getTime())) {
        return t('errors.invalid_date')
      }

      const today = normalizeDate(new Date())

      if (birthDate > today) {
        return t('errors.invalid_date')
      }

      const age = getAge(birthDate, today)
      return age >= minAge ? null : t('errors.age_restriction')
    },

    letters: (msg = 'errors.letters_required'): ValidationRule => (value) => {
      const v = normalize(value).trim()
      if (!v) return null
      const regex = /^[\p{L}\s-]+$/u
      return regex.test(v) ? null : t(msg)
    },

    latinAlphaNumeric: (msg = 'errors.latin_alphanumeric'): ValidationRule => (value) => {
      const v = normalize(value).trim()
      if (!v) return null
      const regex = /^[a-zA-Z0-9@._+\- ]+$/
      return regex.test(v) ? null : t(msg)
    },

    minLength: (min: number, msg = 'errors.minimum'): ValidationRule => (value) => {
      const v = normalize(value)
      if (!v) return null
      return v.length >= min ? null : t(msg, { min })
    },

    maxLength: (max: number, msg = 'errors.maximum'): ValidationRule => (value) => {
      const v = normalize(value)
      if (!v) return null
      return v.length <= max ? null : t(msg, { max })
    },

    match: (targetValue: unknown, msg = 'errors.passwords_do_not_match'): ValidationRule => (value) => {
      const v = normalize(value)
      if (!v) return null

      const target = normalize(targetValue)
      return v === target ? null : t(msg)
    },

    postcode: (
      msg = 'errors.invalid_postcode',
      regex = /^\d{4,10}$/
    ): ValidationRule => (value) => {
      const v = normalize(value).trim()
      if (!v) return null

      return regex.test(v) ? null : t(msg)
    },
  }
}
