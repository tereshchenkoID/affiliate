import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

import { usePathname, useRouter } from '@/i18n/navigation'

import { SETTINGS_NAVIGATION } from '@/constant'

import { useFilterState } from '@/hooks/useFilterState'
import { useModal } from '@/hooks/useModal'
import { useValidations } from '@/hooks/useValidations'
import { nav } from '@/utils/navigation'

import Action from '@/components/Form/Action'
import Select, { SelectOption } from '@/components/Form/Select'
import Box from '@/components/Layout/Box'
import Callout from '@/components/Overlay/Callout'
import Link from '@/components/Typography/Link'
import Text from '@/components/Typography/Text'

interface FormState {
  language: SelectOption | null
}

type FormErrors = Partial<Record<keyof FormState, string | null>>

const LanguageModal = ({ data, locale }: { data: SelectOption[], locale: SelectOption }) => {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const { closeModal } = useModal()

  const VALIDATION_RULES = useValidations()

  const { filter, handlePropsChange } = useFilterState<FormState>({
    language: locale
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const isValidationErrors = Object.values(errors).some(Boolean)
  const isChanged = filter.language?.value !== locale.value
  const isDisabled = isValidationErrors || !isChanged || !filter.language

  const setFieldError = (name: keyof FormState, err: string | null): void => {
    setErrors((prev) => ({ ...prev, [name]: err }))
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (isDisabled) return

    router.replace(pathname, { locale: filter.language?.value })
    closeModal()
  }

  return (
    <Box
      display="grid"
      gap="2"
      as="form"
      align="center"
      onSubmit={handleSubmit}
      width="100%"
    >
      <Callout color="primary" size="2">
        <Text size="4">{t('notification.language_change')}</Text>
        <Link
          href={nav(SETTINGS_NAVIGATION, 'system')}
          size="4"
          onClick={() => closeModal()}
        >
          {t('notification.system_default')}
        </Link>
      </Callout>
      <Select
        data={data}
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

export default LanguageModal
