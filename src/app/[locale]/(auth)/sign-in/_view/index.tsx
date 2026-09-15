'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

import { AUTH } from '@/constant'

import { useFilterState } from '@/hooks/useFilterState'
import { useValidations } from '@/hooks/useValidations'

import Action from '@/components/Form/Action'
import Checkbox from '@/components/Form/Checkbox'
import Field from '@/components/Form/Field'
import Box from '@/components/Layout/Box'
import Heading from '@/components/Typography/Heading'
import Link from '@/components/Typography/Link'
import Text from '@/components/Typography/Text'
import Logo from '@/modules/Logo'

import style from './index.module.scss'

import { UIToggleValue } from '@/types/ui'

interface FormState {
  email: string
  password: string
  remember: UIToggleValue
}

type FormErrors = Partial<Record<keyof FormState, string | null>>

const Section = () => {
  const t = useTranslations()
  const VALIDATION_RULES = useValidations()

  const { filter, handlePropsChange } = useFilterState<FormState>({
    email: '',
    password: '',
    remember: '0'
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const isValidationErrors = Object.values(errors).some(Boolean)
  const isFormIncomplete = !filter.email || !filter.password
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
        <Heading
          as="h1"
          align="center"
        >
          {t(AUTH['sign-in'].text)}
        </Heading>
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
        <Checkbox
          data={filter.remember}
          placeholder={t('notification.remember_me')}
          onChange={e => handlePropsChange('remember', e)}
        />
        <Action
          type="submit"
          color="primary"
          size="3"
          disabled={isDisabled}
        >
          {t(AUTH['sign-in'].text)}
        </Action>
        <Link href={AUTH['forgot-password'].url} align="center">{t(AUTH['forgot-password'].text)}?</Link>
        <Text as="div" align="center">
          {t('notification.dont_have_account')} <Link href={AUTH['sign-up'].url}>{t(AUTH['sign-up'].text)}</Link>
        </Text>
      </Box>
    </Box>
  )
}

export default Section
