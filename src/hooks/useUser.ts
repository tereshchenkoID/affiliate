import { useContext } from 'react'
import { useStore } from 'zustand'

import { UserContext } from '@/context/UserContext'

export const useUser = () => {
  const store = useContext(UserContext)

  if (!store) {
    throw new Error('useUser must be used within UserProvider')
  }

  const user = useStore(store, (state) => state.user)
  const setUser = useStore(store, (state) => state.setUser)
  const updateUser = useStore(store, (state) => state.updateUser)
  const resetUser = useStore(store, (state) => state.resetUser)

  return {
    user,
    setUser,
    updateUser,
    resetUser,
  }
}
