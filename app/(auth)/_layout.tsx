import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
      <Stack.Screen
        name="index"
        options={{ presentation: "modal", animation: "slide_from_bottom" }}
      />
      <Stack.Screen name="register" />
      <Stack.Screen name="verification" />
      <Stack.Screen name="prefrence" />
      <Stack.Screen name="accountVerified" />
      <Stack.Screen name="resetPassword" />
    </Stack>
  );
};

export default AuthLayout;
