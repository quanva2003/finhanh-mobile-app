import { Input } from '@ui-kitten/components'
import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = React.ComponentProps<typeof Input> & { errorText?: string }

const TextInput = ({ errorText, ...props }: Props) => (
  <View style={styles.container}>
    <Input size="large" style={styles.input} selectionColor="#1677ff" {...props} />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#FFFBFF',
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 25,
  },
  error: {
    fontSize: 14,
    color: '#BA1A1A',
    paddingHorizontal: 4,
    paddingTop: 4,
  },
})

export default memo(TextInput)
