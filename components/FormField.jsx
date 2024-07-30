import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = (props) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${props.otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>
        {props.title}
      </Text>

      <View className=' flex-row border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center'>
        <TextInput
          className='flex-1 text-white font-psemibold text-base'
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={props.handleChangeText}
          secureTextEntry={props.title === 'Password' && !showPassword}
        />

        {props.title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(prevState => !prevState)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              resizeMode='contain'
              className='w-6 h-6'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
