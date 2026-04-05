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

  isLoggedIn: () => {
    return get().user !== null
  },

  isUserInLibrary: () => {
    const { user, libraryUsers } = get()
    if (!user) return false
    return libraryUsers.some((u) => u.email === user.email)
  },

  bookSlot: (data) => {
    const { user, libraryUsers, maxSlots } = get()

    if (!user) return { success: false, message: "Not logged in" }

    if (libraryUsers.length >= maxSlots)
      return { success: false, message: "No slots available" }

    const exists = libraryUsers.find((u) => u.email === user.email)
    if (exists)
      return { success: false, message: "Already booked" }

    set({
      libraryUsers: [
        ...libraryUsers,
        {
          ...data,
          email: user.email,
          name: user.name,
        },
      ],
    })

    return { success: true }
  },
}))