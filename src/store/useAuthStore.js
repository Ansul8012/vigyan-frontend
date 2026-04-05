import { create } from "zustand"

export const useAuthStore = create((set, get) => ({
  user: null,
  libraryUsers: [],
  maxSlots: 50,

  login: (userData) =>
    set({
      user: userData,
    }),

  signup: (userData) =>
    set({
      user: userData,
    }),

  logout: () =>
    set({
      user: null,
    }),

  bookSlot: (data) => {
    const { libraryUsers, user } = get()
    if (!user) return

    const exists = libraryUsers.find((u) => u.email === user.email)
    if (exists) return

    set({
      libraryUsers: [...libraryUsers, { ...data, email: user.email }],
    })
  },
}))