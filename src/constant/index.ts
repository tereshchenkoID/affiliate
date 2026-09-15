export interface Navigation {
  url: string
  text: string
  icon: string
}

export const DASHBOARD: Record<string, Navigation> = {
  'home': {
    url: '/',
    text: 'navigation.home',
    icon: 'home',
  }
}

export const AUTH: Record<string, Navigation> = {
  'sign-in': {
    url: '/sign-in',
    text: 'navigation.sign-in',
    icon: 'home',
  },
  'sign-up': {
    url: '/sign-up',
    text: 'navigation.sign-up',
    icon: 'home',
  },
  'forgot-password': {
    url: '/forgot-password',
    text: 'navigation.forgot-password',
    icon: 'home',
  }
}
