import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { EmptyAlertBox, ListingCard } from "@/components";
import { useNavigation } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IListing } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";

const ListingSearchScreen = () => {
  const navigation = useNavigation();
  const { allListing } = useSelector((state: RootState) => state.main);
  const [filteredListing, setFilteredListing] = useState<IListing[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search by Name & Address"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="search" size={22} color={Colors.Primary} />
        </View>
      ),
    });
  }, [navigation, searchQuery]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filteredList =
      query.length === 0
        ? allListing
        : allListing.filter(
            (l) =>
              l.name.toLowerCase().includes(query) ||
              l.address.toLowerCase().includes(query)
          );

    setFilteredListing(filteredList);
  }, [searchQuery]);

  return (
    <>
      <ScrollView className="flex-1 px-[4%] py-4">
        {searchQuery.length > 0 && (
          <Text className="text-lg font-semibold text-Primary mb-4">
            Search results for "{searchQuery}"
          </Text>
        )}

        {filteredListing.length ? (
          filteredListing.map((item, index) => (
            <ListingCard listing={item} key={item._id ?? index} />
          ))
        ) : (
          <EmptyAlertBox
            title="No listings found."
            subtitle="Try searching for something else."
          />
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "90%",
  },
  searchInput: {
    marginLeft: 4,
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});

export default ListingSearchScreen;
