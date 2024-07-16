import React from 'react'
import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  return (
    <View className='flex-1 items-center justify-center bg-amber-200'>
      <Text className='text-3xl font-pblack'>Spectra!</Text>
      <StatusBar style='auto' />
      <Link style={{ color: 'blue' }} href='/home'>
        Go to Home
      </Link>
    </View>
  )
}
