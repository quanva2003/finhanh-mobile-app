import { Icon, List, ListItem } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextStyle, View } from 'react-native'
import formatDate from '../../utils/date-format'
import { fetchReceipts } from '@/services/receipt.service'
import { ReceiptListItem } from '@/types/receipt.interface'

const ReceiptList = ({
  receiptType,
  navigate,
  needRefresh,
}: {
  receiptType: string
  navigate: any
  needRefresh: boolean
}) => {
  const [dataReceipt, setDataReceipt] = useState<ReceiptListItem[]>([])

  useEffect(() => {
    fetchData()
  }, [receiptType, needRefresh])

  const fetchData = async () => {
    try {
      const data = await fetchReceipts(receiptType)
      setDataReceipt(data)
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  const handleEdit = (item: ReceiptListItem): void => {
    navigate({
      name: 'Cập nhật hóa đơn',
      params: { item: item },
      merge: true,
    })
  }

  const childItem = (title: string, content: string | React.ReactNode) => {
    return (
      content &&
      (title === 'Ghi chú' ? (
        <Text>
          <Text style={styles.labelChildItem}>{title}: </Text>
          <Text style={styles.contentChildItem}>{content}</Text>
        </Text>
      ) : (
        <View style={styles.childItem}>
          <Text style={styles.labelChildItem}>{title}: </Text>
          <Text style={styles.contentChildItem} ellipsizeMode="tail" numberOfLines={1}>
            {content}
          </Text>
        </View>
      ))
    )
  }

  const renderItem = ({ item }: { item: ReceiptListItem }): React.ReactElement => {
    const createdAtDate = new Date(item.created_at)
    const formattedCreatedAt = formatDate(createdAtDate)
    const formattedAmount = `${item.amount.toLocaleString()}`

    return (
      <ListItem style={styles.listItemStyle} onPress={() => handleEdit(item)}>
        <View style={{ gap: 6, width: '90%' }}>
          <Text style={styles.titleStyle}>{item.name}</Text>

          {childItem('Loại phiếu', item.receipt_categories.category)}

          {childItem(
            'Số tiền',
            <Text>
              <Text style={valueChildItem(receiptType)}>{formattedAmount}</Text>
              {' VND'}
            </Text>,
          )}

          {childItem('Ngày tạo', formattedCreatedAt)}

          {childItem('Ghi chú', item.notes)}
        </View>
        <View style={{ width: '6%' }}>
          <Icon style={styles.icon} name={'arrow-ios-forward-outline'} />
        </View>
      </ListItem>
    )
  }

  return (
    <View>
      <List style={styles.container} data={dataReceipt} renderItem={renderItem} initialNumToRender={10} />
    </View>
  )
}

const styles = StyleSheet.create({
  childItem: {
    display: 'flex',
    flexDirection: 'row',
  },

  contentChildItem: {
    fontSize: 16,
  },

  labelChildItem: {
    fontWeight: '600',
    fontSize: 16,
  },

  icon: {
    width: 30,
    height: 30,
  },

  listItemStyle: {
    gap: 5,
    paddingVertical: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#bebebe',
    borderRadius: 10,
    justifyContent: 'space-between',
  },

  container: {
    paddingTop: 10,
    marginBottom: 112,
  },

  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default ReceiptList

const valueChildItem = (type: string) => {
  const style: TextStyle = {
    fontWeight: 'bold',
    fontSize: 17,
  }

  type === 'expense' ? (style.color = '#ff4d4f') : (style.color = '#08a908')
  return style
}
