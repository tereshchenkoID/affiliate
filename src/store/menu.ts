import { create } from 'zustand'

interface MenuState {
  isOpen: boolean
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
  setMenu: (isOpen: boolean) => void
}

export const useMenuStore = create<MenuState>((set) => ({
  isOpen: true,
  openMenu: () => set({ isOpen: true }),
  closeMenu: () => set({ isOpen: false }),
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
  setMenu: (isOpen) => set({ isOpen }),
}))
