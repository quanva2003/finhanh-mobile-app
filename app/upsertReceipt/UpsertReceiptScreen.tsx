import UpsertReceiptForm from '@/components/receipt/UpsertReceiptForm'
import React from 'react'

const UpsertReceiptScreen = ({ route, navigation }: { route?: any; navigation?: any }) => {
  const params = route?.params || {} // Ensure params is always an object
  const isUpdateMode = !!params.item

  return <UpsertReceiptForm id={isUpdateMode ? params.item.id : null} navigate={navigation} />
}

export default UpsertReceiptScreen
