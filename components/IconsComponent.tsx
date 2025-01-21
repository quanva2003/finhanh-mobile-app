import { Icon, IconElement } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'

export const CalendarIcon = (props: any): IconElement => <Icon {...props} name="calendar" />

export const SyncIcon = (props: any) => <Icon {...props} name="sync-outline" />

export const PlusIcon = (props: any) => <Icon {...props} name="plus" />

export const ArrowForward = (props: any) => <Icon {...props} name="arrow-ios-forward-outline" />

export const EditIcon = (props: any): IconElement => <Icon {...props} fill="#858483" name="edit-2-outline" />

export const MoreIcon = (props: any): IconElement => <Icon {...props} fill="#858483" name="more-vertical-outline" />

export const PriceIcon = (props: any): IconElement => <Icon {...props} fill="#ff6a00" name="pricetags-outline" />

export const UpIcon = (props: any): IconElement => <Icon {...props} name="trending-up-outline" />

export const DownIcon = (props: any): IconElement => <Icon {...props} name="trending-down-outline" />

export const ReceiptNameIcon = (): IconElement => <Icon style={styles.icon} fill="#c2c2c2" name="browser-outline" />

export const ReceiptAmountIcon = (): IconElement => <Icon style={styles.icon} fill="#c2c2c2" name="pricetags-outline" />

export const ReceiptCategoriesIcon = (): IconElement => <Icon style={styles.icon} fill="#c2c2c2" name="copy-outline" />

export const ReceiptDateIcon = (): IconElement => <Icon style={styles.icon} fill="#c2c2c2" name="calendar-outline" />

export const ReceiptNotesIcon = (): IconElement => <Icon style={styles.icon} fill="#c2c2c2" name="file-text-outline" />

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    padding: 10,
  },
})
