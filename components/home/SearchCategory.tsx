import { hp, wp } from "@/constants";
import { ICategory } from "@/types";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import Animated, { SlideInUp } from "react-native-reanimated";

type Props = {
  categories: ICategory[];
};

export default function SearchCategory({ categories }: Props) {
  const handleOnClick = (id: string) => {
    return router.push(`/(screens)/ListingByCategory?id=${id}`);
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
      className="w-full my-4">
      {categories.map((item, index) => (
        <Animated.View
          key={item._id}
          entering={SlideInUp.delay(index * 100).damping(15)}>
          <TouchableOpacity
            onPress={() => handleOnClick(item._id)}
            className="mx-1 border-2 shadow-lg shadow-black/60 border-Primary/60 rounded-full items-center w-20 h-20 p-1 justify-center">
            <Image
              source={{ uri: item.image.url }}
              className="object-cover aspect-square absolute rounded-full mb-2 w-full h-full"
            />
            <Text className="text-white bg-Primary/70 px-3 py-1 rounded-md shadow-md shadow-black font-semibold text-sm">
              {item.name}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
}
