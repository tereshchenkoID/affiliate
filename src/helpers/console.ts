const styles = {
  info:    'color:#2563eb;font-weight:600',
  success: 'color:#16a34a;font-weight:600',
  warn:    'color:#d97706;font-weight:600',
  error:   'color:#dc2626;font-weight:600',
  reset:   'color:inherit',
}

const time = () =>
  new Date().toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

const log = (
  type: 'info' | 'success' | 'warn' | 'error' | 'reset',
  label: string | number,
  ...args: unknown[]
): void => {
  console.log(
    `[${time()}] %c${label}`,
    styles[type],
    ...args
  )
}

export const consoleHelper = {
  info:    (label: string | number, ...args: unknown[]) => log('info', label, ...args),
  success: (label: string | number, ...args: unknown[]) => log('success', label, ...args),
  warn:    (label: string | number, ...args: unknown[]) => log('warn', label, ...args),
  error:   (label: string | number, ...args: unknown[]) => log('error', label, ...args),
}
