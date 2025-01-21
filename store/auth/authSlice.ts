import { create } from "zustand"
import { User } from "@/types/user"
import { Student } from "@/types/student"

interface AuthState {
  token: string | null
  user: User | null
  students: Student[]
  setCredentials: (user: User, token: string, students: Student[]) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>(set => ({
  token: null,
  user: null,
  students: [],
  setCredentials: (user, token, students) => set(state => ({ ...state, user, token, students })),
  logout: () => set(state => ({ ...state, user: null, token: null, students: [] })),
}))
