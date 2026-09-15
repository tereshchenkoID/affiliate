'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

import { AUTH } from '@/constant'

import { useFilterState } from '@/hooks/useFilterState'
import { useValidations } from '@/hooks/useValidations'

import Action from '@/components/Form/Action'
import Checkbox from '@/components/Form/Checkbox'
import Field from '@/components/Form/Field'
import Switch from '@/components/Form/Switch'
import Box from '@/components/Layout/Box'
import Callout from '@/components/Overlay/Callout'
import Heading from '@/components/Typography/Heading'
import Link from '@/components/Typography/Link'
import Text from '@/components/Typography/Text'
import Logo from '@/modules/Logo'

import style from '@/app/[locale]/(auth)/sign-in/_view/index.module.scss'

import { UIToggleValue } from '@/types/ui'

interface FormState {
  id: string
  name: string
  email: string
  password: string
  terms: UIToggleValue
}

type FormErrors = Partial<Record<keyof FormState, string | null>>

const Section = () => {
  const t = useTranslations()
  const VALIDATION_RULES = useValidations()

  const { filter, handlePropsChange } = useFilterState<FormState>({
    id: '',
    name: '',
    email: '',
    password: '',
    terms: '0'
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const isValidationErrors = Object.values(errors).some(Boolean)
  const isFormIncomplete = !filter.name || !filter.email || !filter.password || filter.terms === '0' // TODO create function
  const isDisabled = isValidationErrors || isFormIncomplete

  const setFieldError = (name: keyof FormState, err: string | null): void => {
    setErrors((prev) => ({ ...prev, [name]: err }))
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (isDisabled) return
  }

  return (
    <Box
      as="section"
      display="flex"
      align="center"
      justify="center"
      width="100%"
      height="100vh"
      p="4"
    >
      <Box
        display="grid"
        gap="3"
        as="form"
        align="center"
        onSubmit={handleSubmit}
        m="auto"
        p="6"
        width="100%"
        className={style.form}
      >
        <Box justifySelf="center">
          <Logo />
        </Box>
        <Heading as="h1" align="center">
          {t(AUTH['sign-up'].text)}
        </Heading>
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
          type="email"
          data={filter.email}
          placeholder={t('email')}
          onChange={(val) => handlePropsChange('email', val)}
          isRequired={true}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.minLength(3),
            VALIDATION_RULES.latinAlphaNumeric(),
            VALIDATION_RULES.email()
          ]}
          onValidate={(err) => setFieldError('email', err)}
          error={errors.email}
        />
        <Field
          type="password"
          visibility={true}
          data={filter.password}
          placeholder={t('password')}
          onChange={(val) => handlePropsChange('password', val)}
          isRequired={true}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.minLength(6),
          ]}
          onValidate={(err) => setFieldError('password', err)}
          error={errors.password}
        />
        <Text as="p" size="1">
          {t('notification.affiliate_id')}
        </Text>
        <Field
          data={filter.id}
          placeholder={t('affiliate_id')}
          onChange={(val) => handlePropsChange('id', val)}
          isRequired={true}
          rules={[
            VALIDATION_RULES.required(),
            VALIDATION_RULES.minLength(3),
            VALIDATION_RULES.latinAlphaNumeric(),
          ]}
          onValidate={(err) => setFieldError('id', err)}
          error={errors.id}
        />
        <Callout color="warning" size="1">
          {t('notification.affiliate_unique')}
        </Callout>
        <Checkbox
          data={filter.terms}
          onChange={e => handlePropsChange('terms', e)}
          rules={[
            VALIDATION_RULES.required(),
          ]}
          onValidate={err => setFieldError('terms', err)}
          error={errors?.terms}
        >
          <Text as="p">
            {
              t.rich('notification.accept_terms', {
                terms: (chunks) => <Link href={AUTH['terms']?.url}>{chunks}</Link>,
                privacy: (chunks) => <Link href={AUTH['privacy']?.url}>{chunks}</Link>,
              })
            }
          </Text>
        </Checkbox>
        <Action
          type="submit"
          color="primary"
          size="3"
          disabled={isDisabled}
        >
          {t('notification.start_now')}
        </Action>
        <Text as="div" align="center">
          {t('notification.have_account')} <Link href={AUTH['sign-in'].url}>{t(AUTH['sign-in'].text)}</Link>
        </Text>
      </Box>
    </Box>
  )
}

export default Section
