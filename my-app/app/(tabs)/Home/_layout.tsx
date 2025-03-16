import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '@/constants'

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen options={{
                headerShown: false,

            }} name='index' />
        </Stack>
    )
}

export default StackLayout