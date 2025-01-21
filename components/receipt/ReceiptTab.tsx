import { Button, Tab, TabView, Text } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { SyncIcon } from '../IconsComponent'
import ReceiptList from './ReceiptList'

const ReceiptTabs = ({ navigation }: any): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [needRefresh, setNeedRefresh] = useState<boolean>(false)

  const handleRefresh = () => {
    setNeedRefresh(!needRefresh)
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button appearance="ghost" size="large" onPress={() => handleRefresh()} accessoryRight={SyncIcon} />
      ),
      headerLeft: () => null,
    })
  }, [navigation, needRefresh])

  return (
    <TabView selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)}>
      <Tab
        title={
          <Text category="h1" style={styles.text}>
            Phiếu chi
          </Text>
        }
        style={styles.tabView}
      >
        <ReceiptList receiptType="expense" navigate={navigation.navigate} needRefresh={needRefresh} />
      </Tab>
      <Tab
        title={
          <Text category="h1" style={styles.text}>
            Phiếu thu
          </Text>
        }
        style={styles.tabView}
      >
        <ReceiptList receiptType="income" navigate={navigation.navigate} needRefresh={needRefresh} />
      </Tab>
    </TabView>
  )
}

const styles = StyleSheet.create({
  tabView: {
    paddingVertical: 10,
  },
  text: {
    fontSize: 100,
    fontWeight: 'bold',
  },
})

export default ReceiptTabs
