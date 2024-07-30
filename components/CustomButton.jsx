import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${props.containerStyles} ${props.isLoading ? 'opacity-50' : ''}`}
      disabled={props.isLoading}
      onPress={props.handlePress}
      activeOpacity={0.7}
    >
      <Text className={`text-primary font-psemibold text-lg ${props.textStyles}`}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
