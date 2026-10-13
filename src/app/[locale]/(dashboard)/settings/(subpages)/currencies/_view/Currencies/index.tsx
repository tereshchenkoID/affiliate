import React, { Fragment, useState } from 'react'
import { useTranslations } from 'next-intl'

import { useFilterState } from '@/hooks/useFilterState'
import { useValidations } from '@/hooks/useValidations'

import Action from '@/components/Form/Action'
import Select, { SelectOption } from '@/components/Form/Select'
import Box from '@/components/Layout/Box'
import Grid from '@/components/Layout/Grid'
import Icon from '@/components/Overlay/Icon'
import Separator from '@/components/Overlay/Separator'
import Heading from '@/components/Typography/Heading'
import Text from '@/components/Typography/Text'
import Tooltip from '@/components/Typography/Tooltip'

import style from '../index.module.scss'

import { ApiProps } from '@/types/common'

interface FormState {
  currencies: SelectOption[]
}

type FormErrors = Partial<Record<keyof FormState, string | null>>

const Currencies = ({ currencies }: { currencies : ApiProps }) => {
  const t = useTranslations()
  const [add, setAdd] = useState<boolean>(false)
  const VALIDATION_RULES = useValidations()

  const { filter, handlePropsChange } = useFilterState<FormState>({
    currencies: [
      {
        value: 'eur',
        label: 'EUR (Euro)'
      },
      {
        value: 'usd',
        label: 'USD (US Dollar)'
      },
    ],
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const isValidationErrors = Object.values(errors).some(Boolean)
  const isDisabled = isValidationErrors

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (isDisabled) return

    setAdd(false)
  }

  return (
    <>
      <Grid gap="2" className={style.grid}>
        <Box>
          <Heading as="h4" size="4">Currencies</Heading>
          <Text size="3" color="gray">Choose the currencies available for tracking, reporting, balances, and settlements.</Text>
        </Box>
        <Box
          display="grid"
          gap="2"
        >
          {
            filter.currencies.length > 0 &&
            <>
              {
                filter.currencies.map((el, idx) =>
                  <Fragment key={el.value}>
                    <Box
                      display="flex"
                      align="center"
                      justify="between"
                      gap="2"
                      py="1"
                    >
                      <Box
                        display="flex"
                        align="center"
                        gap="2"
                      >
                        <Text size="4" weight={idx === 0 ? 'bold' : 'regular'}>
                          {el.label}
                        </Text>
                        {
                          idx === 0 &&
                          <Tooltip content={'This currency is used as a target currency in which cumulative amounts are computed (e.g. for reports, graphs, etc.).'}>
                            <Action
                              size="1"
                              color="primary"
                            >
                              Primary
                            </Action>
                          </Tooltip>
                        }
                      </Box>
                      <Action
                        size="1"
                        color={idx === 0 ? 'muted' : 'danger'}
                        disabled={idx === 0}
                        square
                      >
                        <Icon name="trash" size="14" />
                      </Action>
                    </Box>
                    <Separator color="muted" />
                  </Fragment>
                )
              }
            </>
          }
          {
            !add &&
            <Action
              color="primary"
              size="3"
              onClick={() => setAdd(true)}
            >
              <Icon name="circle-plus" size="16"/>
              {t('notification.add_new')}
            </Action>
          }
        </Box>
      </Grid>
      <Separator color="muted" />
      {
        add &&
        <>
          <Grid gap="2" className={style.grid}>
            <Box>
              <Heading as="h4" size="4">Add new currency</Heading>
              <Text size="3" color="gray">Add another currency for tracking, reporting, balances, and settlements.</Text>
            </Box>
            <Box
              as="form"
              display="grid"
              gap="2"
              onSubmit={handleSubmit}
            >
              <Select
                data={currencies?.data}
                // value={filter.language}
                onChange={(val) => handlePropsChange('currency', val)}
                placeholder={t('currency')}
                isRequired
                isSearch
              />
              <Grid
                gap="2"
                columns="2"
              >
                <Action
                  type="submit"
                  color="success"
                  size="3"
                  disabled={isDisabled}
                >
                  <Icon name="check" size="16"/>
                  {t('notification.add_new')}
                </Action>
                <Action
                  type="reset"
                  size="3"
                  color="danger"
                  onClick={() => setAdd(false)}
                >
                  {t('cancel')}
                </Action>
              </Grid>
            </Box>
          </Grid>
          <Separator color="muted" />
        </>
      }
    </>
  )
}

export default Currencies
