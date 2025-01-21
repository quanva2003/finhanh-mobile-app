export interface AddReceiptItem {
  name: string
  amount: string
  type: string
  category_id: number
  notes: string
  date_happened: Date
  status: string
}

export interface UpdateReceiptItem {
  name: string
  amount: string
  type: string
  category_id: number
  notes: string
  date_happened: Date
  status: string
}

export interface Receipt {
  amount: number
  category_id: number
  created_at: Date
  created_by_id: number
  date_happened: Date
  id: number
  name: string
  notes: string
  receipt_categories: ReceiptCategory
  type: string
  updated_at: Date
  status: string
}

export interface ReceiptCategory {
  category: string
  created_at: Date
  created_by_id: number
  id: number
  type: 'expense' | 'income'
  updated_at: Date
}
export interface ApiResponse {
  data: {
    items: Receipt[]
    meta: {
      currentPage: number
      itemCount: number
      itemsPerPage: number
      totalItems: number
      totalPages: number
    }
  }
}
export interface ReceiptListItem {
  amount: number
  category_id: number
  created_at: Date
  created_by_id: number
  date_happened: Date
  id: number
  name: string
  notes: string
  receipt_categories: ReceiptCategory
  type: string
  updated_at: Date
}
