'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

import { useFilterState } from '@/hooks/useFilterState'
import { useUser } from '@/hooks/useUser'
import { useValidations } from '@/hooks/useValidations'

import Action from '@/components/Form/Action'
import Field from '@/components/Form/Field'
import Select, { SelectOption } from '@/components/Form/Select'
import Box from '@/components/Layout/Box'
import Grid from '@/components/Layout/Grid'
import Icon from '@/components/Overlay/Icon'
import Heading from '@/components/Typography/Heading'
import Text from '@/components/Typography/Text'

import style from './index.module.scss'

import { ApiProps, SettingsProps } from '@/types/common'

interface FormState {
  legal_name: string
  address: string
  city: string
  postal_code: string
  country: SelectOption | null
  vat: string
  invoicing_email: string
}

type FormErrors = Partial<Record<keyof FormState, string | null>>

const Section = ({ settings, countries }: { settings: SettingsProps, countries: ApiProps }) => {
  const t = useTranslations()
  const { user } = useUser()
  const VALIDATION_RULES = useValidations()

  console.log(user)

  const { filter, handlePropsChange } = useFilterState<FormState>({
    legal_name: '',
    address: '',
    city: '',
    postal_code: '',
    country: null,
    vat: '',
    invoicing_email: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const isValidationErrors = Object.values(errors).some(Boolean)
  const isDisabled = isValidationErrors

  const setFieldError = (name: keyof FormState, err: string | null): void => {
    setErrors((prev) => ({ ...prev, [name]: err }))
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (isDisabled) return
  }

  const handleUseCredentials = () => {
    handlePropsChange('legal_name', user?.workspace.name)
    handlePropsChange('invoicing_email', user?.profile.email)
  }

  return (
    <Box
      as="section"
      display="grid"
      gap="4"
      className={style.block}
    >
      <Grid gap="2" className={style.grid}>
        <Box>
          <Heading as="h4" size="4">Company details</Heading>
          <Text size="3" color="gray">Update the business address used on invoices and other billing documents.</Text>
        </Box>
        <Box
          as="form"
          display="grid"
          gap="2"
          onSubmit={handleSubmit}
        >
          <Box mb="2">
            <Action
              color="primary"
              size="2"
              onClick={handleUseCredentials}
            >
              <Icon name="move-down" size="12" />
              Use your Trackdesk account credentials
            </Action>
          </Box>
          <Field
            data={filter.legal_name}
            placeholder={t('legal_name')}
            onChange={(val) => handlePropsChange('legal_name', val)}
            isRequired={true}
            rules={[
              VALIDATION_RULES.required(),
              VALIDATION_RULES.minLength(3),
              VALIDATION_RULES.latinAlphaNumeric(),
            ]}
            onValidate={(err) => setFieldError('legal_name', err)}
            error={errors.legal_name}
          />
          <Field
            data={filter.address}
            placeholder={t('address')}
            onChange={(val) => handlePropsChange('address', val)}
            isRequired={true}
            rules={[
              VALIDATION_RULES.required(),
              VALIDATION_RULES.minLength(3),
              VALIDATION_RULES.latinAlphaNumeric(),
            ]}
            onValidate={(err) => setFieldError('address', err)}
            error={errors.address}
          />
          <Field
            data={filter.city}
            placeholder={t('city')}
            onChange={(val) => handlePropsChange('city', val)}
            isRequired={true}
            rules={[
              VALIDATION_RULES.required(),
              VALIDATION_RULES.minLength(3),
              VALIDATION_RULES.latinAlphaNumeric(),
            ]}
            onValidate={(err) => setFieldError('city', err)}
            error={errors.city}
          />
          <Field
            data={filter.postal_code}
            placeholder={t('postal_code')}
            onChange={(val) => handlePropsChange('postal_code', val)}
            isRequired={true}
            rules={[
              VALIDATION_RULES.required(),
              VALIDATION_RULES.minLength(3),
              VALIDATION_RULES.latinAlphaNumeric(),
            ]}
            onValidate={(err) => setFieldError('postal_code', err)}
            error={errors.postal_code}
          />
          <Select
            data={countries?.data}
            value={filter.country}
            onChange={(val) => handlePropsChange('country', val)}
            placeholder={t('country')}
            isRequired
            isSearch
            rules={[
              VALIDATION_RULES.required(),
            ]}
            onValidate={(err) => setFieldError('country', err)}
            error={errors.country}
          />
          <Field
            data={filter.vat}
            placeholder={t('vat')}
            onChange={(val) => handlePropsChange('vat', val)}
          />
          <Field
            type="email"
            data={filter.invoicing_email}
            placeholder={t('invoicing_email')}
            onChange={(val) => handlePropsChange('invoicing_email', val)}
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
      </Grid>
    </Box>
  )
}

export default Section
