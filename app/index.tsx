import { Redirect } from 'expo-router'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Index() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  const checkAuth = async () => {
    const isAuthorized = await AsyncStorage.getItem('isAuthorized')
    setIsAuth(isAuthorized !== null)
  }
  useEffect(() => {
    checkAuth()
  }, [])

  if (isAuth === null) return null

  return isAuth ? <Redirect href="/(tabs)/home" /> : <Redirect href="/login" />
}
