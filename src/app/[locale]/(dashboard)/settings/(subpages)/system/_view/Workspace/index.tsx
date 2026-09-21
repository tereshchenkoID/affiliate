import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

import { useFilterState } from '@/hooks/useFilterState'
import { useValidations } from '@/hooks/useValidations'

import Action from '@/components/Form/Action'
import Field from '@/components/Form/Field'
import Box from '@/components/Layout/Box'

interface FormState {
  name: string
  website: string
}

type FormErrors = Partial<Record<keyof FormState, string | null>>

const Workspace = () => {
  const t = useTranslations()
  const VALIDATION_RULES = useValidations()

  const { filter, handlePropsChange } = useFilterState<FormState>({
    name: '',
    website: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const isValidationErrors = Object.values(errors).some(Boolean)
  const isDisabled = isValidationErrors || !filter.name || !filter.website

  const setFieldError = (name: keyof FormState, err: string | null): void => {
    setErrors((prev) => ({ ...prev, [name]: err }))
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (isDisabled) return
  }

  return (
    <Box
      as="form"
      display="grid"
      gap="2"
      onSubmit={handleSubmit}
    >
      <Field
        data={filter.name}
        placeholder={t('name')}
        onChange={(val) => handlePropsChange('name', val)}
        isRequired={true}
        rules={[
          VALIDATION_RULES.required(),
          VALIDATION_RULES.minLength(3),
          VALIDATION_RULES.latinAlphaNumeric(),
        ]}
        onValidate={(err) => setFieldError('name', err)}
        error={errors.name}
      />
      <Field
        data={filter.website}
        placeholder={t('company_website')}
        onChange={(val) => handlePropsChange('website', val)}
        isRequired={true}
        rules={[
          VALIDATION_RULES.required(),
          VALIDATION_RULES.minLength(3),
          VALIDATION_RULES.latinAlphaNumeric(),
        ]}
        onValidate={(err) => setFieldError('website', err)}
        error={errors.website}
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

export default Workspace
