import axiosInstance from "./axiosInstance"

export const getPhoto = async (studentId: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/photo/student/${studentId}`)
    return response.data
  } catch (error) {
    console.error("API call failed:", error)
    throw error
  }
}
