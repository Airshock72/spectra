import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import WebView from 'react-native-webview'

const VideoCard = (props) => {
  const [play, setPlay] = useState(false)
  return (
    <View className='flex-col items-center px-4 mb-14'>
      <View className='flex-row gap-3 items-start'>
        <View className='justify-center items-center flex-row flex-1'>
          <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
            <Image
              source={{ uri: props.video.creator.avatar }}
              className='w-full h-full rounded-lg'
              resizeMode='cover'
            />
          </View>
          <View className='justify-center flex-1 ml-3 gap-y-1'>
            <Text
              className='text-white font-psemibold text-sm'
              numberOfLines={1}>
              {props.video.title}
            </Text>
            <Text
              className='text-xs text-gray-100 font-pregular'
              numberOfLines={1}>
              {props.video.creator.username}
            </Text>
          </View>
        </View>
      </View>
      {play
        ? <WebView
          source={{ uri: props.video.video }}
          className='w-[390px] h-[230px] rounded-xl mt-3 bg-white/10'
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
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
          className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
          activeOpacity={0.7}
        >
          <Image
            source={{ uri: props.video.thumbnail }}
            className='w-full h-full rounded-xl mt-3'
            resizeMode='cover'
          />
          <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain' />
        </TouchableOpacity>
      }
    </View>
  )
}

export default VideoCard
