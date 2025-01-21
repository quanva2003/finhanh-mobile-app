import axiosInstance from "./axiosInstance"
import { LoginPayload, LoginResponse } from "@/types/auth"

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post("/user/login", payload)
    return response.data
  } catch (error) {
    console.error("API call failed:", error)
    throw error
  }
}
