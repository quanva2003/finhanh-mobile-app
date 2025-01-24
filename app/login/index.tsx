import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Icon } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Image, ImageBackground, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Input from '@/components/login/Input'
import useStore from '@/store'
import { emailValidator, passwordValidator } from '@/utils/helpers'
import { authenticate } from '@/services/auth'
import { IS_AUTHENTICATED } from '@/utils/constants'
import { router } from 'expo-router'

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [userName, setUserName] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [secureTextEntry, setSecureTextEntry] = React.useState(true)
  const { isAuthorized, setAuthorized } = useStore()

  const handleLogin = async () => {
    const userNameError = emailValidator(userName.value)
    const passwordError = passwordValidator(password.value)

    if (userNameError || passwordError) {
      setUserName({ ...userName, error: userNameError })
      setPassword({ ...password, error: passwordError })
      return {
        userName,
        password,
      }
    }

    const auth = await authenticate(userName.value, password.value)

    if (auth) {
      await AsyncStorage.setItem('isAuthorized', IS_AUTHENTICATED)
      setAuthorized(true)
      router.push('/(tabs)/home')
    }
  }

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry)
  }

  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  )

  return (
    <ImageBackground
      source={require('../../assets/images/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image style={styles.image} source={require('../../assets/images/logo.png')} />
        <Input
          placeholder="Tên đăng nhập"
          returnKeyType="next"
          value={userName.value}
          onChangeText={text => setUserName({ value: text, error: '' })}
          errorText={userName.error}
          autoCapitalize="none"
        />
        <Input
          value={password.value}
          placeholder="Mật khẩu"
          returnKeyType="done"
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={text => setPassword({ value: text, error: '' })}
          errorText={password.error}
        />

        <Button style={styles.buttonLogin} size="medium" appearance="filled" onPress={handleLogin}>
          Đăng nhập
        </Button>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    paddingTop: 120,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    color: '#1677ff',
    fontWeight: 'bold',
    paddingVertical: 14,
  },
  buttonLogin: {
    marginTop: 25,
    width: '100%',
    borderRadius: 25,
  },
  image: {
    width: '100%',
    height: 100,
    marginBottom: 25,
  },
})
