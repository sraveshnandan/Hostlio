import { ScrollView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IListing } from '@/types';
import { EmptyAlertBox, ListingCard } from '@/components';

const ListingByCategory = () => {
    const params = useLocalSearchParams();
    const navigation = useNavigation()

    const { categories, allListing } = useSelector((state: RootState) => state.main)

    const [category, setCategory] = useState(categories.find(c => c._id.toString() === params.id.toString()));
    const [categoriesListings, setCategoriesListings] = useState<IListing[]>([]);
    const [filteredListings, setFilteredListings] = useState<IListing[]>([]);
    const [searchQuery, setSearchQuery] = useState("")

    useLayoutEffect(() => {
        if (category) {
            navigation.setOptions({
                headerTitle: `${category.name}'s`,
                headerSearchBarOptions: {
                    placeholder: "Search listings...",
                    searchIconColor: "#ffffff",
                    placeholderTextColor: "#FFFFFF",
                    onChangeText: (event: any) => {

                        const query = event.nativeEvent.text.toLowerCase();
                        setSearchQuery(query);  // Save the search query first

                        if (query.length === 0) {
                            // If query is empty, reset to all listings
                            setFilteredListings(categoriesListings);
                        } else {
                            // Filter listings based on the search query
                            const filtered = categoriesListings.filter(listing =>
                                listing.name.toLowerCase().includes(query)
                            );
                            setFilteredListings(filtered);
                        }
                    },
                },
            });

        }
    }, [params, searchQuery])


    useEffect(() => {
        const cate = categories.find(c => c._id.toString() === params.id.toString());
        if (cate) {
            const cateListings = allListing.filter(list => list.category.name.toLowerCase() === cate.name.toLowerCase());
            setCategoriesListings(cateListings);
            setFilteredListings(cateListings)
        }
    }, [params.id, categories, allListing]);

    return (
        <ScrollView className='flex-1 py-2 px-[4%]'>
            {
                filteredListings.length ? (
                    filteredListings.map((item, index) => (
                        <ListingCard key={index} listing={item} />
                    ))
                ) : (
                    <EmptyAlertBox title='No any listing found.' subtitle='Please choose any other category.' />
                )
            }
        </ScrollView>
    )
}

export default ListingByCategory;
