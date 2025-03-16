import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { EmptyAlertBox, ListingCard, ListingSearchModal, SearchBarComponent } from '@/components'
import { router, useNavigation } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors, hp } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { IListing } from '@/types'

const ListingSearchcreen = () => {
    const navigation = useNavigation();
    const { allListing } = useSelector((state: RootState) => state.main);
    const [filtredListing, setfiltredListing] = useState<IListing[]>([]);
    const [searchQuery, setsearchQuery] = useState("");
    const [filtermethod, setfiltermethod] = useState(0);
    const [filterModelOpen, setfilterModelOpen] = useState<boolean>(false)


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])



    useEffect(() => {
        const filtredList = filtermethod === 0 ? allListing.filter(l => l.name.includes(searchQuery)) : allListing.filter(l => l.address.includes(searchQuery));
        setfiltredListing(filtredList)
    }, [searchQuery.length])


    return (
        <>
            <View className='flex-1'>
                {
                    filterModelOpen && (
                        <ListingSearchModal open={filterModelOpen} setIsopen={setfilterModelOpen} filtermode={filtermethod} setfiltermode={setfiltermethod} />
                    )
                }
                {/* header  */}
                <LinearGradient style={styles.container} colors={[Colors.Primary, Colors.Secondry]}>
                    <View className=' h-full'>
                        <View className='flex-row items-center justify-between'>
                            <TouchableOpacity onPress={() => router.back()} className={`flex-row`}>
                                <Ionicons size={22} color={Colors.White} name='chevron-back' />
                                <Text className='text-white ml-2 font-medium '>Back</Text>
                            </TouchableOpacity>

                            <View className='flex-grow  pl-12 '>
                                <Text className=' text-white text-xl font-medium'>Search Listings</Text>
                            </View>
                        </View>
                        <SearchBarComponent filtermethod={filtermethod} setfiltermethod={setfiltermethod} query={searchQuery} setQuery={setsearchQuery} />
                    </View>
                </LinearGradient>



                {/* searchResult  */}
                <ScrollView className='flex-1 px-[4%]  py-2'>
                    <>
                        {searchQuery.length > 0 && (
                            <Text className='text-lg font-semibold text-Primary mb-4'>Search result of {searchQuery}</Text>
                        )}
                    </>
                    {
                        filtredListing.length ? (
                            <>
                                {filtredListing.map((item, index) => (
                                    <ListingCard listing={item} key={index} />
                                ))}
                            </>
                        ) : <EmptyAlertBox title='There is no any listing found.' subtitle='Please search something new.' />
                    }
                </ScrollView>


            </View>

            {/* filter button 
            <View className='bg-white p-2 shadow flex-row items-center'>
                <TouchableOpacity onPress={() => setfiltermethod(0)} className='border-r-2 border-r-gray-400 w-1/2 flex-row items-center justify-center  py-2'>
                    <MaterialCommunityIcons name='restore' size={22} />
                    <Text className='text-md ml-2 font-bold'>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setfilterModelOpen(true)} className='  w-1/2 flex-row items-center justify-center  py-2'>
                    <MaterialCommunityIcons name='filter' size={22} />
                    <Text className='text-md ml-2 font-bold'>Filters</Text>
                </TouchableOpacity>

            </View> */}

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: hp(22),
        padding: "4%"

    }
})

export default ListingSearchcreen