import { View, Text } from 'react-native'
import React from 'react'
import { IListing } from '@/types'

type Props = {
    listing: IListing
}

const ListingCard = ({ listing }: Props) => {
    return (
        <View>
            <Text>ListingCard</Text>
        </View>
    )
}

export default ListingCard