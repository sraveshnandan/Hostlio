import { View, Text, TextInput } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants'
import { TouchableOpacity } from 'react-native-gesture-handler'

type Props = {
    query: string,
    setQuery: Dispatch<SetStateAction<string>>
    filtermethod: number,
    setfiltermethod: Dispatch<SetStateAction<number>>
}

const SearchBar = ({ query, setQuery, filtermethod, setfiltermethod }: Props) => {
    const [Searchquery, setSearchquery] = useState<string>(query);
    const [modeToggle, setmodeToggle] = useState<boolean>(false)


    const handletextInput = (value: string) => {
        setSearchquery(value);
        return setQuery(value)
    }


    return (
        <View className='absolute -bottom-2 w-full'>
            <View className='bg-white p-2 flex-row items-center rounded-md shadow-md shadow-gray-200 '>
                <Ionicons name='search' size={22} color={Colors.Primary} />
                <TextInput value={Searchquery} onChangeText={(value) => handletextInput(value)} keyboardType='default' className='flex-grow ml-2 font-medium py-1' placeholder={filtermethod === 0 ? "Search by Name" : "Search by address"} />

                <TouchableOpacity onPress={() => setmodeToggle(prev => !prev)} className={`flex-row bg-gray-200 rounded-full px-3 py-1 items-center ${modeToggle && "bg-green-600"}`}>
                    <Ionicons name="invert-mode" />
                    <Text className={`${modeToggle && "text-white"} ml-1`}>mode</Text>
                </TouchableOpacity>
            </View>
            {
                modeToggle && (
                    < View className='flex-row  mt-2 bg-white p-2 w-[70%] mx-auto border rounded-full items-center justify-between px-3'>
                        <TouchableOpacity onPress={() => setfiltermethod(0)}
                            className={`${filtermethod === 0 ? "bg-Primary" : "bg-gray-200"}  px-5  py-2 rounded-full`}>
                            <Text className={` text-Primary text-center w-full ${filtermethod === 0 && "text-white"} text-md font-medium`}>By name</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setfiltermethod(1)}
                            className={`${filtermethod === 1 ? "bg-Primary" : "bg-gray-200"} px-5  py-2  rounded-full`}>
                            <Text className={`text-Primary text-center ${filtermethod === 1 && "text-white"} text-md font-medium`}>By Address</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

        </View >
    )
}

export default SearchBar