import "react-native-gesture-handler";
import { persistor, store } from "@/redux/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Colors } from "@/constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SocketProvider } from "@/providers";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    IBM_Regular: require("../assets/fonts/IBMPlexSans-Regular.ttf"),
    IBM_Medium: require("../assets/fonts/IBMPlexSans-Medium.ttf"),
    IBM_Semibold: require("../assets/fonts/IBMPlexSans-SemiBold.ttf"),
    IBM_Bold: require("../assets/fonts/IBMPlexSans-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider>
          <RootLayoutNav />
        </SocketProvider>
      </PersistGate>
    </Provider>
  );
}

function RootLayoutNav() {
  // Final useEffect to load app data
  useEffect(() => {}, []);

  // Final Return Statement
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerTitleStyle: { fontFamily: "IBM_Regular" },
          animation: "ios",
          statusBarColor: Colors.Primary,
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)" options={{ headerShown: false }} />
      </Stack>
      <Toast position="top" visibilityTime={1000} />
    </GestureHandlerRootView>
  );
}
