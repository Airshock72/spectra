import { FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'
import WebView from 'react-native-webview'

const zoomIn = {
  0: {
    scale: 0.8
  },
  1: {
    scale: 1.0
  }
}

const zoomOut = {
  0: {
    scale: 1.0
  },
  1: {
    scale: 0.8
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
        ? <WebView
          source={{ uri: props.item.video }}
          className='w-52 h-72 rounded-[33px] mt-3 bg-white/10'
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onMessage={e => {
            const message = e.nativeEvent.data
            if (message === 'videoEnded') {
              setPlay(false)
            }
          }}
          mediaPlaybackRequiresUserAction={true}
          allowsInlineMediaPlayback={true}
        />
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
