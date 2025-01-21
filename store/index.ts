import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'

type AppState = {
  // Define your application state here
  isAuthorized: boolean
  setAuthorized: (value: boolean) => void
}

const useStore = create<AppState>(set => ({
  isAuthorized: false,
  setAuthorized: async (value: boolean) => {
    await AsyncStorage.setItem('isAuthorized', value.toString()) // Store as string
    set({ isAuthorized: value }) // Update Zustand store
  },
}))

// Ensure Zustand initializes correctly from AsyncStorage
AsyncStorage.getItem('isAuthorized').then(value => {
  useStore.setState({ isAuthorized: value === 'true' })
})
export default useStore
