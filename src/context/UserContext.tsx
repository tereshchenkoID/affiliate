'use client'

import {
  createContext, type ReactNode, useContext, useState
} from 'react'
import { useStore } from 'zustand/react'

import {
  createUserStore, type User, UserState, type UserStore
} from '@/store/user'

export const UserContext = createContext<UserStore | null>(null)

export interface UserProviderProps {
  children: ReactNode
  initialUser: User
}

export const UserProvider = ({ children, initialUser }: UserProviderProps) => {
  const [store] = useState(() => createUserStore(initialUser))

  return (
    <UserContext.Provider value={store}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserStore = <T,>(selector: (state: UserState) => T): T => {
  const store = useContext(UserContext)

  if (!store) {
    throw new Error('useUserStore must be used within UserProvider')
  }

  return useStore(store, selector)
}
