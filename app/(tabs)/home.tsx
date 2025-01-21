// ReceiptScreen.tsx
import ReceiptTabs from '@/components/receipt/ReceiptTab'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import UpsertReceiptScreen from '../upsertReceipt/UpsertReceiptScreen'

const ReceiptScreen = (): React.ReactElement => {
  const ReceiptStack = createStackNavigator()

  return (
    <ReceiptStack.Navigator>
      <ReceiptStack.Screen name="Danh sách thu chi" component={ReceiptTabs} />
      <ReceiptStack.Screen name="Cập nhật hóa đơn" component={UpsertReceiptScreen} />
    </ReceiptStack.Navigator>
  )
}

export default ReceiptScreen
