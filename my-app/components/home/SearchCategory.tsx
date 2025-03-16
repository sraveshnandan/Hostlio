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
          className={`items-center bg-White p-3 rounded-lg shadow-md shadow-black/40 justify-center mx-3  space-y-1`}
          entering={SlideInUp.delay(index * 100).damping(15)}>
          <TouchableOpacity
            onPress={() => handleOnClick(item._id)}
            className="border-2  border-Primary/60 rounded-full items-center w-24 h-24 p-1 justify-center">
            <Image
              source={{ uri: item.image.url }}
              className="object-cover aspect-square absolute rounded-full mb-2 w-full h-full"
            />
          </TouchableOpacity>
          <Text className="text-Secondry capitalize  font-semibold text-lg">
            {item.name}
          </Text>
        </Animated.View>
      ))}
    </ScrollView>
  );
}
