export type ValidationRule = (value: string) => string | null | undefined

export const runRules = (
  value: string,
  rules?: ValidationRule[] | null
): string | null => {
  if (!rules?.length) return null

  for (const rule of rules) {
    const error = rule(value)
    if (error) return error
  }

  return null
}
