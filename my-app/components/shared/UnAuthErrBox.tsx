import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

type Prop = {
  message?: string;
};
const UnAuthErrBox = ({ message }: Prop) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Animated.View
        entering={FadeInDown.delay(250).springify()}
        className="w-[90%] mx-auto p-4 rounded-lg shadow-md shadow-black/20 items-center justify-center bg-White">
        <Image
          className="w-24 h-24 mb-2"
          source={require("@/assets/images/warning.png")}
        />

        <Text className="mb-4 font-semibold opacity-70 text-md">
          {message ?? "Please login / Register to Proceed here."}
        </Text>
        <TouchableOpacity
          onPress={() => router.navigate(`/(auth)/`)}
          className="bg-Primary rounded-md py-3 w-[60%] items-center justify-center">
          <Text className="text-White text-xl font-semibold">
            Login/Register
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default UnAuthErrBox;

const styles = StyleSheet.create({});
