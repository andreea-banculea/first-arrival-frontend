import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/logos/logo4.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 200,
    
  },
})
