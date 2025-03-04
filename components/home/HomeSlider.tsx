import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import HorizontalSlider from "./SliderComp";
import { homeSlider, hp, wp } from "@/constants";
import { router } from "expo-router";

interface SliderItem {
  id: number;
  image: any;
  title: string;
  btnText: string;
  link: string;
}

const RenderItem: React.FC<{ item: SliderItem }> = ({ item }) => (
  <ImageBackground source={{ uri: item.image }} style={styles.slide}>
    <View className="absolute h-fit w-[70%] bg-transparent/30 p-2 rounded-lg left-4">
      <Text
        numberOfLines={2}
        className="text-white  text-2xl font-semibold max-w-[70%]">
        {item.title}
      </Text>

      <TouchableOpacity
        onPress={() => router.push(`${item?.link}`)}
        className="bg-Primary w-[50%] my-2 flex items-center justify-center py-1 rounded-full">
        <Text className="text-white text-md font-semibold">{item.btnText}</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
);

const HomeScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, marginVertical: 15 }}>
      <HorizontalSlider
        data={homeSlider}
        renderItem={({ item }) => <RenderItem item={item} />}
        loop
        timing={4000}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  slide: {
    width: wp(95),
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
    resizeMode: "cover",
    position: "relative",
    marginTop: 10,
  },
});
