import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { useActiveRouteName } from '../routing/ActiveRouteContext'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />

      <Paragraph>
        Welcome!{'\n'}Please login to continue.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')} style={undefined}      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')} style={undefined}      >
        Sign Up
      </Button>
    </Background>
  )
}
