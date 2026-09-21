import React, { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

import { useFilterState } from '@/hooks/useFilterState'
import { useValidations } from '@/hooks/useValidations'

import Action from '@/components/Form/Action'
import Select, { SelectOption } from '@/components/Form/Select'
import Box from '@/components/Layout/Box'
import Callout from '@/components/Overlay/Callout'

import { SettingsProps } from '@/types/common'

interface FormState {
  language: SelectOption | null
}

type FormErrors = Partial<Record<keyof FormState, string | null>>

const Language = ({ settings }: { settings: SettingsProps }) => {
  const t = useTranslations()
  const VALIDATION_RULES = useValidations()
  const router = useRouter()
  const pathname = usePathname()

  const currentLocale = useLocale()
  const currentLang = settings?.languages?.find(el => el.value === currentLocale) || {
    value: currentLocale,
    label: currentLocale
  }

  const { filter, handlePropsChange } = useFilterState<FormState>({
    language: currentLang,
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const isValidationErrors = Object.values(errors).some(Boolean)
  const isChanged = filter.language?.value !== currentLang.value
  const isDisabled = isValidationErrors || !isChanged || !filter.language

  const setFieldError = (name: keyof FormState, err: string | null): void => {
    setErrors((prev) => ({ ...prev, [name]: err }))
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (isDisabled) return

    router.replace(pathname, { locale: filter.language?.value })
  }

  return (
    <Box
      as="form"
      display="grid"
      gap="2"
      onSubmit={handleSubmit}
    >
      <Callout color="primary" size="2">
        <p>{t('notification.language_change')}</p>
        <Action
          size="1"
          color="primary"
          justify="start"
          style={{ marginTop: '0.5rem' }}
          onClick={() => {
            router.replace(pathname, { locale: routing.defaultLocale })
          }}
        >
          {t('notification.use_default_language')}
        </Action>
      </Callout>
      <Select
        data={settings?.languages}
        value={filter.language}
        onChange={(val) => handlePropsChange('language', val)}
        placeholder={t('language')}
        isRequired
        isSearch
        rules={[
          VALIDATION_RULES.required(),
        ]}
        onValidate={(err) => setFieldError('language', err)}
        error={errors.language}
      />
      <Action
        type="submit"
        color="success"
        size="3"
        disabled={isDisabled}
      >
        {t('save')}
      </Action>
    </Box>
  )
}

export default Language
