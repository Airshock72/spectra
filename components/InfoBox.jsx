import React from 'react'
import { View, Text } from 'react-native'

const InfoBox = (props) => {
  return (
    <View className={props.containerStyle}>
      <Text className={`text-white text-center font-psemibold ${props.titleStyles}`}>{props.title}</Text>
      <Text className='text-sm text-gray-100 text-center font-pregular'>{props.subTitle}</Text>
    </View>
  )
}

export default InfoBox
