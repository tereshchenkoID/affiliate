import { useCallback, useState } from 'react'

export type FilterValue = string | number | boolean | null | undefined | object | unknown[]

export const useFilterState = <T extends Record<string, any>>(
  initialValue: T = {} as T
) => {
  const [filter, setFilter] = useState<T>(initialValue)

  const handlePropsChange = useCallback((fieldName: string, fieldValue: FilterValue): void => {
    setFilter((prevData) => {
      const updated = structuredClone(prevData || {})
      const keys = fieldName.replace(/\[(\d+)\]/g, '.$1').split('.')

      let current: Record<string, unknown> = updated
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]

        if (current[key] === null || current[key] === undefined) {
          const nextKeyIsIndex = !isNaN(Number(keys[i + 1]))
          current[key] = nextKeyIsIndex ? [] : {}
        }

        current = current[key] as Record<string, unknown>
      }

      const lastKey = keys[keys.length - 1]
      current[lastKey] = fieldValue

      return updated
    })
  }, [])

  return { filter, setFilter, handlePropsChange }
}
