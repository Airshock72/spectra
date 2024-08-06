import { FlatList, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../../lib/useAppwrite'
import { getUserPosts, signOut } from '../../lib/appwrite'
import VideoCard from '../../components/VideoCard'
import EmptyState from '../../components/EmptyState'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const userPostsHook = useAppwrite({ fn: () => getUserPosts(user.$id) })

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={userPostsHook.data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              className='w-full items-end mb-10'
              onPress={async () => {
                await signOut
                setUser(null)
                setIsLoggedIn(false)
                router.replace('/sign-in')
              }}
            >
              <Image source={icons.logout} resizeMode='contain' className='w-6 h-6' />
            </TouchableOpacity>
            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image source={{ uri: user?.avatar }} className='w-[90%] h-[90%] rounded-lg' resizeMode='cover' />
            </View>
            <InfoBox
              title={user?.username}
              containerStyle='mt-5'
              titleStyles='text-lg'
            />
            <View className='mt-5 flex-row'>
              <InfoBox
                title={userPostsHook.data.length || 0}
                subTitle='Posts'
                containerStyle='mr-10'
                titleStyles='text-xl'
              />
              <InfoBox
                title='1.2k'
                subTitle='Followers'
                titleStyles='text-xl'
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title='No Videos Found'
              subtitle='No videos found for this search query'
            />
          )
        }}
      />
    </SafeAreaView>
  )
}

export default Profile
