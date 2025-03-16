import { Colors } from "@/constants";
import { SocketProvider } from "@/providers";
import { persistor, store } from "@/redux/store";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const RootLayout = () => {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <SocketProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                statusBarColor: Colors.Primary,
                statusBarAnimation: "slide",
                navigationBarHidden:true
              }}
            >
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(screens)" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </SocketProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
