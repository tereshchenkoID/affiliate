export const fixed = (
  data: number | string,
  symbol: number = 2
): string => {
  const num = typeof data === 'number' ? data : parseFloat(String(data))
  return num.toFixed(symbol)
}
