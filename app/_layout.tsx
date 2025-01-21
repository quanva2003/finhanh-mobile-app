import { Stack } from 'expo-router'
import { useCachedResources } from '@/hooks/useCachedResources'
import '../global.css'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { View } from 'react-native'
import * as Updates from 'expo-updates'
import { useEffect } from 'react'
export default function RootLayout() {
  const fontsLoaded = useCachedResources()

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync()

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    } catch (error) {
      alert(`Error fetching latest Expo update: ${error}`)
    }
  }

  useEffect(() => {
    onFetchUpdateAsync()
  }, [])

  if (!fontsLoaded) {
    return null
  }
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <View style={{ flex: 1 }}>
          <Stack
            initialRouteName="login"
            screenOptions={{
              headerShown: false,
            }}
          />
        </View>
      </ApplicationProvider>
    </>
  )
}
