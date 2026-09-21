import { SelectOption } from '@/components/Form/Select'

export interface SettingsProps {
  languages?: SelectOption[],
  theme?: SelectOption[],
  timezone?: SelectOption[],
  [key: string]: any
}
