import { Statistic } from '@/types/dashboard.interface'
import dayjs from 'dayjs'

export const transformData = (data: Statistic) => {
  const Mapped_title: { [key: string]: string } = {
    today: 'Hôm nay',
    thisWeek: 'Tuần này',
    lastWeek: 'Tuần trước',
    thisMonth: 'Tháng này',
    count: 'Nhân viên',
    basic_income: 'Lương dự tính',
    final_income: 'Lương thực tế',
  }

  const income = data.income_expense.income.map(e => {
    return {
      name: Mapped_title[e.name],
      value: e.value,
    }
  })

  const expense = data.income_expense.expense.map(e => {
    return {
      name: Mapped_title[e.name],
      value: e.value,
    }
  })
  const chart = data.income_expense.chart

  return {
    income,
    expense,
    chart,
  }
}

export const formatMoney = (money: number, fixed = 0) => {
  return money.toFixed(fixed).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
}

export const formatDate = (date: Date, format = 'en-GB') => {
  return date.toLocaleDateString(format)
}

export const formatDateOfWeek = (day: number) => {
  const dayOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
  return dayOfWeek[day]
}

export const emailValidator = (email: string) => {
  if (!email || email.length <= 0) return ' Vui lòng nhập tài khoản.'
  if (email.length <= 4) return 'Tài khoản quá ngắn.'
  return ''
}

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return 'Vui lòng nhập mật khẩu.'
  return ''
}

export const getFullMonth = () => {
  const currentYear = new Date().getFullYear()
  const fullMonth = Array.from({ length: 12 }, (_, i) => new Date(`${currentYear}-${i + 1}-01`)).map(date =>
    date.toLocaleString('default', { month: '2-digit', year: 'numeric' }),
  )

  return fullMonth
}

export const convertToISODate = (dateString: string) => {
  const customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat)
  const isoDate = dayjs(dateString, 'MM/YYYY').toISOString()

  return isoDate
}
