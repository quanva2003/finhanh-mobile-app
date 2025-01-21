import { AppRoute } from '@/utils/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp } from '@react-navigation/native'
import axios from 'axios'

// Function to handle authentication with phone number and password using JWT
export const authenticate = async (userName: string, password: string): Promise<string> => {
  try {
    const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/auth/sign-in`, {
      username: userName,
      password,
    })
    console.log('response:', response)
    if (response.data.statusCode && response.data.statusCode === 200) {
      if (response.data.data.access_token) {
        const token = response.data.data.access_token
        await AsyncStorage.setItem('Token', token)
      }
    } else {
      alert('Tài khoản hoặc mật khẩu sai!')
    }

    return response.data.data.access_token
  } catch (error: any) {
    throw new Error(error)
  }
}

export const logout = async (navigation: NavigationProp<Record<string, object>>): Promise<void> => {
  await AsyncStorage.removeItem('isAuthorized')
  navigation.navigate(AppRoute.SIGN_IN as never)
}

// Function to check if the user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token')
  return !!token
}
