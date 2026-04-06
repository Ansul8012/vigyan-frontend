import { create } from "zustand"

export const useAuthStore = create((set, get) => ({
  user: null,
  libraryUsers: [],
  maxSlots: 50,

  authStatus: "idle", // idle | scanning | success | error
  authError: null,

  login: (userData) =>
    set({
      user: userData,
      authStatus: "success",
      authError: null,
    }),

  logout: () =>
    set({
      user: null,
      authStatus: "idle",
    }),

  // 🔐 FACE AUTH (MOCK)
  faceAuth: async () => {
    set({ authStatus: "scanning", authError: null })

    try {
      // ================= BACKEND INTEGRATION =================
      // 1. Capture frame from frontend
      // 2. Send to backend (face recognition API)
      // 3. Backend returns user or error
      // ======================================================

      await new Promise((res) => setTimeout(res, 2000))

      // 🧠 Dummy logic (simulate success/failure)
      const isUserFound = Math.random() > 0.4

      if (!isUserFound) {
        set({
          authStatus: "error",
          authError:
            "User not found with this face. Please register first.",
        })
        return
      }

      const userData = {
        name: "Ansul Singh",
        email: "ansul@example.com",
      }

      set({
        user: userData,
        authStatus: "success",
        authError: null,
      })
    } catch (err) {
      set({
        authStatus: "error",
        authError: "Authentication failed. Try again.",
      })
    }
  },

  isUserInLibrary: () => {
    const { user, libraryUsers } = get()
    if (!user) return false
    return libraryUsers.some((u) => u.email === user.email)
  },

  bookSlot: (data) => {
    const { user, libraryUsers, maxSlots } = get()

    if (!user) return { success: false }

    if (libraryUsers.length >= maxSlots)
      return { success: false }

    const exists = libraryUsers.find((u) => u.email === user.email)
    if (exists) return { success: false }

    set({
      libraryUsers: [
        ...libraryUsers,
        { ...data, email: user.email, name: user.name },
      ],
    })

    return { success: true }
  },
}))