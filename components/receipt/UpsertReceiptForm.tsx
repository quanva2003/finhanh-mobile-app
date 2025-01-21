import { Category, fetchCategories } from '@/services/receiptCategories.service'
import { useNavigation } from '@react-navigation/native'
import { Button, Datepicker, IndexPath, Input, Select, SelectItem } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import {
  InputAccessoryView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { DownIcon, ReceiptDateIcon, SyncIcon, UpIcon } from '../IconsComponent'
import { fetchReceipt, postReceipt, updateReceipt } from '@/services/receipt.service'
import { AddReceiptItem } from '@/types/receipt.interface'
import { router } from 'expo-router'

type UpsertReceiptFormProps = {
  id: number
  navigate: any
}

const UpsertReceiptForm = (props: UpsertReceiptFormProps) => {
  const [name, setName] = React.useState('')
  const [validateError, setValidateError] = React.useState(false)
  const [amount, setAmount] = React.useState('')
  const [amountError, setAmountError] = React.useState(false)
  const [selectedType, setSelectedType] = React.useState<number>()
  const [notes, setNotes] = React.useState('')
  const [date, setDate] = React.useState(new Date())
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryByType, setCategoryByType] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<IndexPath>(new IndexPath(0))
  const [status, setStatus] = useState(new IndexPath(0))
  const navigation = useNavigation()
  const { id } = props
  const inputAccessoryViewId = 'id'

  useEffect(() => {
    navigation.setOptions({
      title: id ? 'Cập nhật hóa đơn' : 'Tạo hóa đơn',
      headerRight: () => (
        <Button appearance="ghost" size="large" onPress={() => handleCancel()} accessoryRight={SyncIcon} />
      ),
    })
  }, [navigation])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories()
        setCategories(categoriesData)
        setSelectedType(0)
        if (id) {
          const res = await fetchReceipt(id)
          setName(res.name)
          setAmount(`${res.amount.toLocaleString('en-US')}`)
          setSelectedType(res.type === 'income' ? 1 : 0)
          setNotes(res.notes)
          setDate(new Date(res.created_at))
          const index = categories.findIndex(category => category.id === res.category_id)
          setSelectedCategory(new IndexPath(index !== -1 ? index : 0))
          setStatus(new IndexPath(['active', 'disabled', 'deleted'].indexOf(res.status)))
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchData()
  }, [id])

  const handleCategoriesByType = (type: number) => {
    setSelectedType(type)
    const typeCategory = type === 0 ? 'expense' : 'income'
    const category = categories.filter(category => category.type === typeCategory).map(category => category)
    setCategoryByType(category)
  }

  useEffect(() => {
    if (selectedType !== undefined) {
      handleCategoriesByType(selectedType)
    }
  }, [selectedType])

  const handleDropdownCategories = (index: any) => {
    if (Array.isArray(index)) {
      setSelectedCategory(index[0])
    } else {
      setSelectedCategory(index)
    }
  }

  const handleNameInput = (nextValue: string) => {
    setName(nextValue)
    if (nextValue.trim() === '') {
      setValidateError(true)
    } else {
      setValidateError(false)
    }
  }

  const handleAmountInput = (nextValue: string) => {
    const numericValue = nextValue.replace(/[^\d]/g, '')

    const numberValue = parseFloat(numericValue)
    if (isNaN(numberValue) && numericValue == '') {
      setAmountError(true)
    } else {
      setAmountError(false)
    }
    const formattedValue = isNaN(numberValue) ? '' : numberValue.toLocaleString('en-US')
    setAmount(formattedValue)
  }

  const handleStatusChange = (index: any) => {
    if (Array.isArray(index)) {
      setStatus(index[0])
    } else {
      setStatus(index)
    }
  }

  const handleSubmit = async () => {
    try {
      const amountWithoutCommas = amount.replace(/,/g, '')
      const selectedCategoryId = categories[selectedCategory.row].id
      const statusValue = ['active', 'disabled', 'deleted'][status.row]
      const newReceipt: AddReceiptItem = {
        name,
        amount: amountWithoutCommas,
        type: selectedType === 0 ? 'expense' : 'income',
        category_id: selectedCategoryId,
        notes,
        date_happened: date,
        status: statusValue,
      }
      console.log('new receipt:', newReceipt)
      console.log('id', id)

      if (id) {
        await updateReceipt(id, newReceipt)
      } else {
        await postReceipt(newReceipt)
      }
      router.push('/(tabs)/home')
      resetForm()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const resetForm = () => {
    setName('')
    setAmount('')
    setSelectedType(0)
    setSelectedCategory(new IndexPath(0))
    setNotes('')
    setDate(new Date())
    setAmountError(false)
    setValidateError(false)
    setStatus(new IndexPath(0))
  }

  const handleCancel = () => {
    resetForm()
  }

  const handleKeyboardSubmit = () => {
    Keyboard.dismiss()
    handleSubmit()
  }

  const textLabel = (text: string) => {
    return (evaProps: any) => (
      <Text {...evaProps} style={[evaProps?.style, { fontSize: 16, left: 4 }]}>
        {text}
      </Text>
    )
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 110}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.buttonGroup}>
                <Button
                  style={styles.buttonType}
                  onPress={() => setSelectedType(0)}
                  accessoryRight={DownIcon(styles.accessoryRight)}
                  appearance={selectedType === 0 ? 'filled' : 'outline'}
                >
                  {evaProps => (
                    <Text {...evaProps} style={[evaProps?.style, { fontSize: 25 }]}>
                      Chi
                    </Text>
                  )}
                </Button>
                <Button
                  style={styles.buttonType}
                  onPress={() => setSelectedType(1)}
                  accessoryRight={UpIcon(styles.accessoryRight)}
                  appearance={selectedType === 1 ? 'filled' : 'outline'}
                >
                  {evaProps => (
                    <Text {...evaProps} style={[evaProps?.style, { fontSize: 25 }]}>
                      Thu
                    </Text>
                  )}
                </Button>
              </View>
              <Input
                label={textLabel(`Tên hoá đơn ${selectedType === 0 ? 'chi' : 'thu'}`)}
                placeholder="Nhập tên hóa đơn"
                placeholderTextColor={'gray'}
                value={name}
                size="large"
                onChangeText={handleNameInput}
                style={[styles.inputStyle, { borderColor: validateError ? 'red' : '#e8e8e8' }]}
                inputAccessoryViewID={inputAccessoryViewId}
              />
              {validateError && <Text style={{ color: 'red' }}>Vui lòng nhập tên hóa đơn</Text>}
              <Datepicker
                label={textLabel('Ngày tạo hoá đơn')}
                accessoryRight={ReceiptDateIcon}
                date={date}
                controlStyle={styles.inputStyle}
                onSelect={nextDate => setDate(nextDate)}
                size="large"
                status="primary"
              />
              <Select
                label={textLabel('Loại hoá đơn')}
                value={categoryByType[selectedCategory?.row]?.category}
                selectedIndex={Array.isArray(selectedCategory) ? selectedCategory[0] : selectedCategory}
                onSelect={handleDropdownCategories}
                style={styles.inputStyle}
                size="large"
              >
                {categoryByType.map(category => (
                  <SelectItem key={category.id} title={category.category} />
                ))}
              </Select>
              <Select
                label={textLabel('Trạng thái')}
                value={['Hoạt động', 'Không hoạt động', 'Đã xóa'][status.row]}
                selectedIndex={Array.isArray(status) ? status[0] : status}
                onSelect={handleStatusChange}
                style={styles.inputStyle}
                size="large"
              >
                <SelectItem title="Hoạt động" />
                <SelectItem title="Không hoạt động" />
                <SelectItem title="Đã xóa" />
              </Select>
              <Input
                label={textLabel('Số tiền')}
                placeholder="Nhập số tiền"
                value={amount}
                size="large"
                keyboardType="number-pad"
                onChangeText={handleAmountInput}
                style={[styles.inputStyle, { borderColor: validateError ? 'red' : '#e8e8e8' }]}
                inputAccessoryViewID={inputAccessoryViewId}
                accessoryRight={() => <Text style={{ fontSize: 16 }}>VND</Text>}
              />
              {amountError && <Text style={{ color: 'red' }}>Vui lòng nhập số tiền</Text>}

              <Input
                label={textLabel('Ghi chú')}
                placeholder="Nhập ghi chú (Optional)"
                value={notes}
                onChangeText={nextValue => setNotes(nextValue)}
                textStyle={{ minHeight: 30, textAlignVertical: 'center' }}
                size="large"
                multiline={true}
                style={styles.inputStyle}
                // onSubmitEditing={handleKeyboardSubmit}
                inputAccessoryViewID={inputAccessoryViewId}
              />
              <View>
                <Button style={styles.button} appearance="filled" onPress={handleSubmit}>
                  {evaProps => (
                    <Text {...evaProps} style={[evaProps?.style, { fontSize: 21 }]}>
                      {id ? 'Cập nhật' : 'Lưu'}
                    </Text>
                  )}
                </Button>
              </View>
            </View>
          </ScrollView>
          {Platform.OS === 'ios' && (
            <InputAccessoryView nativeID={inputAccessoryViewId} style={styles.inputAccessoryViewStyle}>
              <TouchableOpacity onPress={() => handleKeyboardSubmit()} style={{ width: 'auto', alignSelf: 'flex-end' }}>
                <View
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    width: 96,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: 'rgba(0,0,0,0.3)',
                  }}
                >
                  <Text>Gửi</Text>
                </View>
              </TouchableOpacity>
            </InputAccessoryView>
          )}
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },

  accessoryRight: {
    width: 30,
    height: 30,
  },

  inputStyle: {
    backgroundColor: 'white',
    borderColor: '#e8e8e8',
  },

  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    height: 50,
    marginHorizontal: 40,
    marginVertical: 20,
  },

  buttonType: {
    margin: 5,
    width: '40%',
  },

  inputAccessoryViewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
})

export default UpsertReceiptForm
