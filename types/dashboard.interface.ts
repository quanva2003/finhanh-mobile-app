export interface Statistic {
  income_expense: IncomeExpense
  staffs: Staffs
  payable_debts: Payable_Debts
  receivable_debts: Receivable_Debts
}

export interface Payable_Debts {
  total_payable_debts: number
  chart: DebtChart[]
}

export interface Receivable_Debts {
  total_receivable_debts: number
  chart: DebtChart[]
}

export interface Staffs {
  count: string
  basic_income: number
  final_income: number
  chart: ItemsStaffChart[]
}

export interface IncomeExpense {
  income: ItemsIncomeExpense[]
  expense: ItemsIncomeExpense[]
  chart: IncomeExpenseChart[]
}

export interface IncomeExpenseChart {
  income: ItemsChartIcomeExpense[]
  expense: ItemsChartIcomeExpense[]
}

export interface ItemsChartIcomeExpense {
  receipts_type: string
  month: string
  value: number
}

export interface ItemsIncomeExpense {
  name: string
  value: number
}

interface ItemsStaffChart {
  month: string
  income: number
}

interface DebtChart {
  month: string
  amount: number
}

export enum DashboardTabType {
  INCOME_EXPENSE = 'income_expense',
  DEBTS = 'debts',
  STAFFS = 'staffs',
}
