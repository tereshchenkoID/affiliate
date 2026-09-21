import { type ComponentType, lazy } from 'react'
import { create } from 'zustand'

import { MODAL_REGISTRY, type ModalName } from '@/widgets/Modals/registry'

import { UIModalSize } from '@/types/ui'

export interface ModalOptions {
  title?: string
  size?: UIModalSize
  onClose?: () => void
  [key: string]: any
}

export interface ModalItem extends ModalOptions {
  id: string
  name: string
  Component: ComponentType<any>
  props: Record<string, any>
  title: string
  zIndex: number
}

interface ModalStore {
  modals: ModalItem[]
  openModal: (
    name: ModalName,
    props?: Record<string, any>,
    modalOptions?: ModalOptions
  ) => string | undefined
  closeModal: (id?: string) => void
  closeAllModals: () => void
}

const loadedComponents = new Map<string, ComponentType<any>>()

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: [],

  openModal: (name, props = {}, modalOptions = {}) => {
    const importFn = MODAL_REGISTRY[name]
    if (!importFn) {
      console.error(`[ModalStore] Modal with name "${name}" not found in MODAL_REGISTRY`)
      return
    }

    if (!loadedComponents.has(name)) {
      loadedComponents.set(name, lazy(importFn))
    }

    const Component = loadedComponents.get(name)!
    const title = modalOptions.title ?? ''

    const isOpened = get().modals.some(
      (m) => m.name === name && m.title === title
    )

    if (isOpened) return

    const id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

    set((state) => ({
      modals: [
        ...state.modals,
        {
          id,
          name,
          Component,
          props,
          ...modalOptions,
          title,
          zIndex: 1000 + state.modals.length * 10,
        },
      ],
    }))

    return id
  },

  closeModal: (id) => {
    const { modals } = get()
    if (!modals.length) return

    const targetModal = id
      ? modals.find((m) => m.id === id)
      : modals[modals.length - 1]

    if (!targetModal) return

    targetModal.onClose?.()

    set((state) => ({
      modals: state.modals.filter((m) => m.id !== targetModal.id),
    }))
  },

  closeAllModals: () => {
    const { modals } = get()
    ;[...modals].reverse().forEach((modal) => modal.onClose?.())
    set({ modals: [] })
  },
}))
