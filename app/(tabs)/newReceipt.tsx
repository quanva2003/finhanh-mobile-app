import { View } from 'react-native'
import React from 'react'
import UpsertReceiptScreen from '../upsertReceipt/UpsertReceiptScreen'

const newReceipt = ({ route, navigation }: { route?: any; navigation?: any }) => {
  return (
    <View className="flex-1">
      <UpsertReceiptScreen route={route} navigation={navigation} />
    </View>
  )
}

export default newReceipt
