import { Card, Icon, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

interface SettingItemProps {
  rigtIcon: string
  leftIcon?: string
  title: string
  onPress?: () => void
}

const SettingItem: React.FC<SettingItemProps> = ({ rigtIcon, title, onPress, leftIcon }) => {
  return (
    <>
      <View style={styles.shadowView}>
        <Card style={styles.card} onPress={onPress}>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
            <View style={styles.leftCard}>
              <Icon style={styles.icon} name={rigtIcon} />
              <Text style={styles.text}>{title}</Text>
            </View>
            {leftIcon && <Icon style={styles.icon} name={leftIcon} />}
          </TouchableOpacity>
        </Card>
      </View>
    </>
  )
}
export default SettingItem

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginLeft: 12,
  },

  card: {
    borderRadius: 10,
  },

  shadowView: {
    margin: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.0,
    elevation: 1,
  },

  icon: {
    color: 'gray',
    width: 20,
    height: 20,
  },

  leftCard: {
    display: 'flex',
    flexDirection: 'row',
    width: 'auto',
    justifyContent: 'space-between',
  },

  TouchableOpacity: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
