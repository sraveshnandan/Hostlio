import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated'
import { EmptyAlert, ListingCard } from '@/components'
import { Ionicons, Octicons } from '@expo/vector-icons'
import { Colors, hp } from '@/constants'

const SavedScreens = () => {

    const { savedListings } = useSelector((state: RootState) => state.main)
    return (
        <ScrollView className='flex-1 px-[4%] py-2'>
            {
                !savedListings.length && (
                    <View style={{ height: hp(80) }} className='flex-1 items-center justify-center'>
                        <Animated.View className={`bg-white py-4 rounded-lg shadow-md w-[90%] items-center jus shadow-black/60`} entering={FadeInLeft.delay(100).springify()}>


                            <Ionicons color={Colors.Primary} size={40} name='infinite-sharp' />

                            <Text className='text-2xl mt-4 font-semibold'>No saved listing yet.</Text>

                            <Text className=' mb-4 opacity-60 font-medium'>Please add some listing to your saved list.</Text>
                        </Animated.View>
                    </View>
                )
            }
            {
                savedListings.map((item, index) => (
                    <Animated.View entering={FadeInDown.delay(index * 100).springify()} key={index} >
                        <ListingCard listing={item} />
                    </Animated.View>
                ))
            }
        </ScrollView>
    )
}

export default SavedScreens