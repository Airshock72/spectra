import { Text, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1.1
  }
}

const zoomOut = {
  0: {
    scale: 1.1
  },
  1: {
    scale: 0.9
  }
}

const TrendingItem = (props) => {
  const [play, setPlay] = useState(false)
  return (
    <Animatable.View
      className='mr-5'
      animation={props.activeItem === props.item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play
        ? <Text className='text-white'>Playing</Text>
        : <TouchableOpacity
          onPress={() => setPlay(true)}
          className='relative justify-center items-center'
          activeOpacity={0.7}
        >
          <ImageBackground
            source={{ uri: props.item.thumbnail }}
            className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
            resizeMode='cover'
          />
          <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain' />
        </TouchableOpacity>
      }
    </Animatable.View>
  )
}

const Trending = (props) => {
  const [activeItem, setActiveItem] = useState(props.posts[0])
  return (
    <FlatList
      data={props.posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} /> }
      horizontal
      onViewableItemsChanged={({ viewableItems }) => {
        setActiveItem(viewableItems[0].key)
      }}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{ x: 170 }}
    />
  )
}

export default Trending
