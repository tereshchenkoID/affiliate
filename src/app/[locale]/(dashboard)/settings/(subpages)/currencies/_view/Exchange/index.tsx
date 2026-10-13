import { useTranslations } from 'next-intl'

import { useFilterState } from '@/hooks/useFilterState'
import { useUser } from '@/hooks/useUser'

import Action from '@/components/Form/Action'
import Switch from '@/components/Form/Switch'
import Box from '@/components/Layout/Box'
import Grid from '@/components/Layout/Grid'
import Heading from '@/components/Typography/Heading'
import Text from '@/components/Typography/Text'

import style from '../index.module.scss'

import { SettingsProps } from '@/types/common'
import { UIToggleValue } from '@/types/ui'

interface FormState {
  exchange: UIToggleValue
}

const Exchange = ({ settings }: { settings: SettingsProps }) => {
  const t = useTranslations()
  const { user } = useUser()

  const { filter, handlePropsChange } = useFilterState<FormState>({
    exchange: user?.exchange,
  })

  const isChanged = filter.exchange !== user?.exchange

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!isChanged) return
  }

  return (
    <Grid gap="2" className={style.grid}>
      <Box>
        <Heading as="h4" size="4">Currency exchange rates</Heading>
        <Text size="3" color="gray">Choose which exchange rates to use when creating settlements.</Text>
      </Box>
      <Box
        as="form"
        display="grid"
        gap="2"
        onSubmit={handleSubmit}
      >
        <Switch
          data={filter?.exchange}
          onChange={(val) => handlePropsChange('exchange', val)}
        >
          <Heading as="h6" size="4">Use conversion-specific exchange rates</Heading>
          <Text size="2">When enabled, exchange rates at the time of each conversion will be used for balance and settlement calculations instead of the current exchange rate.</Text>
        </Switch>
        <Action
          type="submit"
          color="success"
          size="3"
          disabled={!isChanged}
        >
          {t('save')}
        </Action>
      </Box>
    </Grid>
  )
}

export default Exchange
