import axios from "axios"
import { BASE_API } from "@/constants"

const axiosInstance = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "application/json",
    timezone: (new Date().getTimezoneOffset() / 60) * -1,
  },
})

export default axiosInstance
