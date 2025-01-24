import { Tabs } from 'expo-router'
import { Text } from '@/components/ui/Text'
import { Image, View } from 'react-native'
import { Avatar, Icon } from '@ui-kitten/components'
import { useAuthStore } from '@/store/auth/authSlice'
import { BASE_DOMAIN } from '@/constants'
import { AppRoute } from '@/utils/constants'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <Text className="text-xs font-700" style={{ color }}>
              {AppRoute.RECEIPTS}
            </Text>
          ),
          tabBarIcon: ({ color }) => <Icon name="credit-card-outline" fill={color} style={{ width: 24, height: 24 }} />,
        }}
      />
      <Tabs.Screen
        name="newReceipt"
        options={{
          headerTitle: () => (
            <View className="flex-row items-center">
              <Text className="text-lg font-700">{AppRoute.ADD_RECEIPT}</Text>
            </View>
          ),
          tabBarIcon: ({ color }) => <Icon name="plus-circle-outline" fill={color} style={{ width: 24, height: 24 }} />,
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Cài đặt',
          headerTitle: () => (
            <View className="flex-row items-center">
              <Text className="text-lg font-700">Cài đặt</Text>
            </View>
          ),
          tabBarLabel: ({ color }) => (
            <Text className="text-xs font-700" style={{ color }}>
              Cài đặt
            </Text>
          ),
          tabBarIcon: ({ color }) => <Icon name="settings-outline" fill={color} style={{ width: 24, height: 24 }} />,
        }}
      />
    </Tabs>
  )
}
