import type { ComponentType } from 'react'

export const MODAL_REGISTRY: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
  language: () => import('./LanguageModal'),
  password: () => import('./PasswordModal'),
  theme: () => import('./ThemeModal'),
}

export type ModalName = keyof typeof MODAL_REGISTRY
