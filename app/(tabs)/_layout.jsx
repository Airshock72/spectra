import { Tabs, Redirect } from 'expo-router'
import { View, Image } from 'react-native'
import { icons } from '../../constants'
import React from 'react'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View>
      <Image srouce={icon} />
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name='Home'
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout
