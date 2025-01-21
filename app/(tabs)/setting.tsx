import SettingItem from '@/components/setting/SettingItem'
import useStore from '@/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const SettingScreen: React.FC = ({}) => {
  const { setAuthorized } = useStore()
  const handleLogout = async () => {
    setAuthorized(false)
    await AsyncStorage.removeItem('isAuthorized')
    router.push('/login')
  }

  return (
    <View style={styles.container}>
      <SettingItem
        rigtIcon="log-out-outline"
        leftIcon="arrow-ios-forward-outline"
        title="Đăng xuất"
        onPress={handleLogout}
      />
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F9FC',
    flex: 1,
  },
})
