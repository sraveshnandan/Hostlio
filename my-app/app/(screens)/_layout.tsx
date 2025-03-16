import React from "react";
import { router, Stack } from "expo-router";
import { Colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const ScreenLayouts = () => {
  return (
    <Stack
      screenOptions={{
        animation: "ios",
        headerStyle: {
          backgroundColor: Colors.Primary,
        },
        headerTitleStyle: {
          color: Colors.White,
        },
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} className="mr-2">
            <Ionicons name="chevron-back" size={22} color={Colors.White} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="ListingSearchcreen"
        options={{ headerTitle: "Search Listing" }}
      />
      <Stack.Screen
        name="privacy-policy"
        options={{ headerTitle: "Our Privacy Policy" }}
      />
      <Stack.Screen
        name="NotificationScreen"
        options={{ headerTitle: "Notifications" }}
      />

      <Stack.Screen name="ListingDetails" />
      <Stack.Screen name="conversation" />
      <Stack.Screen name="ListingByCategory" />
    </Stack>
  );
};

export default ScreenLayouts;
