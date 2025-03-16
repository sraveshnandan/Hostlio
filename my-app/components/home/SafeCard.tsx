import { View, Text, Image } from 'react-native'
import React from 'react'
import Animated, { SlideInRight } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants'

type Props = {}

const SafeCard = (props: Props) => {
    return (
        <LinearGradient className='rounded-lg' colors={[Colors.Primary, Colors.Secondry]}>
            <Animated.View entering={SlideInRight.delay(200).springify()} className=' p-4 flex-row items-center justify-center rounded-lg h-52' >
                <View className='w-1/2 flex-grow  h-full'>
                    <Text className='text-md mt-6 text-white'>
                        Save yourself from
                    </Text>
                    <Text className='text-3xl text-AscentOne '>
                        Scammers!
                    </Text>

                    <Text className='text-[11px] text-white opacity-80 absolute bottom-6'>
                        By verifying aadhar card of potential landloard.
                    </Text>
                </View>
                {/* image  */}
                <View className='w-1/2'>
                    <Image className='w-full  h-full object-cover' source={require("../../assets/images/verified.png")} />
                </View>
            </Animated.View >
        </LinearGradient>
    )
}

export default SafeCard