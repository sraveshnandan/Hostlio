import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants";

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "ios",
        headerStyle: {
          backgroundColor: Colors.Primary,
        },
        headerTintColor: Colors.White,
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Conversations" }} />
    </Stack>
  );
};

export default StackLayout;
