import { View, Text, StyleSheet } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import FilterModal from './FilterModal'
import { Colors } from '@/constants'

type Props = {
    filtermode: number,
    setfiltermode: Dispatch<SetStateAction<number>>,
    open: boolean,
    setIsopen: Dispatch<SetStateAction<boolean>>
}

const ListingSearchFiltermodal = ({ filtermode, setfiltermode, open, setIsopen }: Props) => {


    const ModalBody = () => {
        return (
            <View className=''>
                <Text>Modal body</Text>
            </View>
        )
    }

    return (
        <FilterModal isOpen={open} ModalBody={ModalBody as any} setIsOpen={setIsopen} title='Filter Listings' titleStyle={styles.textStyle} />
    )
}





const styles = StyleSheet.create({
    textStyle: {
        color: Colors.Primary,
        fontSize: 22
    }
})
export default ListingSearchFiltermodal