import { AddReceiptItem, ApiResponse, UpdateReceiptItem } from '@/types/receipt.interface'
import { Receipt } from '@/types/receipt.interface'
import AsyncStorage from '@react-native-async-storage/async-storage'
export const fetchReceipts = async (receiptType: string): Promise<Receipt[]> => {
  try {
    const token = await AsyncStorage.getItem('token')
    let allItems: Receipt[] = []
    let currentPage = 1
    let totalPages = 1

    while (currentPage <= totalPages) {
      const responseReceiptData = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/receipts?page=${currentPage}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!responseReceiptData.ok) {
        throw new Error('Failed to fetch receipts')
      }

      const responseData: ApiResponse = await responseReceiptData.json()
      const { items } = responseData.data
      allItems = [...allItems, ...items]

      currentPage++
      totalPages = responseData.data.meta.totalPages
    }

    return allItems.filter(item => item.type === receiptType)
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const postReceipt = async (newReceipt: AddReceiptItem): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem('token')
    const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/receipts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReceipt),
    })
    if (!response.ok) {
      throw new Error('Failed to post new receipt')
    }
  } catch (error) {
    console.error('Error posting data:', error)
    throw error
  }
}

export const updateReceipt = async (id: number, updateReceipt: UpdateReceiptItem): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem('token')
    const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/receipts/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateReceipt),
    })

    if (!response.ok) {
      throw new Error('Failed to update receipt')
    }
  } catch (error) {
    console.error('Error update data:', error)
    throw error
  }
}

export const fetchReceipt = async (receiptId: number) => {
  const token = await AsyncStorage.getItem('token')
  const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/receipts/${receiptId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  const json = await response.json()
  const data = json.data as Receipt

  return data
}
