import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { Colors } from '@/constants'
import { Ionicons } from '@expo/vector-icons'

const StackLayout = () => {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: Colors.Primary
            },
            headerTitleStyle: {
                color: Colors.White
            },
            headerTitleAlign: "center",
            headerLeft: () => <TouchableOpacity onPress={() => router.back()} className='mr-2'>
                <Ionicons name='chevron-back' size={22} color={Colors.White} />
            </TouchableOpacity>
        }}>
            <Stack.Screen name='index' options={{ headerTitle: "Profile" }} />
            <Stack.Screen name='editProfile' options={{
                headerTitle: "Update your profile"
            }} />
        </Stack>
    )
}

export default StackLayout