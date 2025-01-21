import { User } from "./user"
import { Student } from "./student"

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
  students: Student[]
  studentIds: string[]
}
