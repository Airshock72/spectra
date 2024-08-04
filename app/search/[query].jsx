import { FlatList, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../../lib/useAppwrite'
import { searchPosts } from '../../lib/appwrite'
import VideoCard from '../../components/VideoCard'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams()
  const searchHook = useAppwrite({ fn: () => searchPosts(query) })

  useEffect(() => {
    searchHook.refetch()
  }, [query])

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={searchHook.data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className='my-6 px-4'>
            <Text className='font-pmedium text-sm text-gray-100'>Search Results</Text>
            <Text className='text-2xl font-psemibold text-white'>{query}</Text>
            <View className='mt-6 mb-8'>
              <SearchInput initialQuery={query} />
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

export default Search
