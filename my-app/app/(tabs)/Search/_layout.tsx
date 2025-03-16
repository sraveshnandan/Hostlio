import React from "react";
import { router, Stack } from "expo-router";
import { Colors } from "@/constants";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
          color: Colors.White,
        },
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} className="mr-2">
            <Ionicons name="arrow-back" size={22} color={Colors.White} />
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen name="index" options={{ headerTitle: "Saved Listing" }} />
    </Stack>
  );
};

export default StackLayout;
