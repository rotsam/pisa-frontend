
import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('pisa_user')) || null,
  token: localStorage.getItem('pisa_token') || null,
  login: (user, token) => {
    localStorage.setItem('pisa_user', JSON.stringify(user))
    localStorage.setItem('pisa_token', token)
    set({ user, token })
  },
  logout: () => {
    localStorage.removeItem('pisa_user')
    localStorage.removeItem('pisa_token')
    set({ user: null, token: null })
  },
}))
