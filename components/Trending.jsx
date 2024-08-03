import { Text, FlatList } from 'react-native'
import React from 'react'

const Trending = (props) => {
  return (
    <FlatList
      data={props.posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <Text className='text-white'>{item.id}</Text>}
      horizontal
    />
  )
}

export default Trending
