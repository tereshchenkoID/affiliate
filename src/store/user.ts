import { createStore } from 'zustand'

import { SelectOption } from '@/components/Form/Select'

import { User } from '@/types/user'

export interface UserState {
  user: User | null
  setUser: (user: User | null) => void
  updateUser: (partialUser: Partial<User>) => void
  resetUser: () => void
}

export type UserStore = ReturnType<typeof createUserStore>

export const createUserStore = (initProps?: User) => {
  return createStore<UserState>()((set) => ({
    user: initProps ?? null,

    setUser: (user) => set({ user }),

    updateUser: (partialUser) =>
      set((state) => ({
        user: state.user ? { ...state.user, ...partialUser } : null,
      })),

    resetUser: () => set({ user: null }),
  }))
}
