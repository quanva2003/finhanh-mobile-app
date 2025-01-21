import { Redirect } from 'expo-router'
import useStore from '@/store'
import { useEffect, useState } from 'react'

export default function Index() {
  const { isAuthorized } = useStore()
  const [isAuth, setIsAuth] = useState<boolean>(false)
  useEffect(() => {
    setIsAuth(isAuthorized)
  }, [isAuthorized])
  return isAuth ? <Redirect href="/(tabs)/home" /> : <Redirect href="/login" />
}
