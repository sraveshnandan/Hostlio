import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors } from "@/constants";

type Props = {};

const SearchBar = (props: Props) => {
  const handleNavigate = () => {
    return router.push(`/(tabs)/Search/`);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleNavigate}
      className="mt-8 mb-2 flex-row rounded-xl items-center justify-between px-2 py-3 bg-white  w-full">
      <Text className="text-gray-400 font-medium text-lg">
        Search by locality & name
      </Text>
      <Ionicons
        style={{ marginRight: 10 }}
        color={Colors.Primary}
        name="search"
        size={24}
      />
    </TouchableOpacity>
  );
};

export default SearchBar;
