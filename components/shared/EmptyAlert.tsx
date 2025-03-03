import { View, Text } from 'react-native'
import React from 'react'
import { Colors, hp } from '@/constants'
import Animated, { FadeInLeft } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'

type Props = {
    title: string,
    subtitle?: string
}

const EmptyAlert = ({ title, subtitle }: Props) => {
    return (
        <View style={{ height: hp(80) }} className='flex-1 items-center justify-center'>
            <Animated.View className={`bg-white py-4 rounded-lg shadow-md w-[90%] items-center jus shadow-black/60`} entering={FadeInLeft.delay(100).springify()}>


                <Ionicons color={Colors.Primary} size={40} name='infinite-sharp' />

                <Text className='text-2xl mt-4 font-semibold'>{title}</Text>

                <Text className=' mb-4 opacity-60 font-medium'>{subtitle}</Text>
            </Animated.View>
        </View>
    )
}

export default EmptyAlert