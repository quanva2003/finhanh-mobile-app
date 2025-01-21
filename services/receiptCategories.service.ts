export interface Category {
  id: number
  category: string
  type: string
}

export const fetchCategories = async () => {
  try {
    let allCategories: Category[] = []
    let currentPage = 1
    let totalPages = 1

    while (currentPage <= totalPages) {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/receipt-categories?page=${currentPage}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      const categoriesData: Category[] = data.data.items
      allCategories = [...allCategories, ...categoriesData]

      currentPage++
      totalPages = data.data.meta.totalPages
    }

    return allCategories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}
