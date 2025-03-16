import { Colors, tintColorLight } from "@/constants";
import { RootState } from "@/redux/store";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { Tabs, usePathname } from "expo-router";
import { useSelector } from "react-redux";
export default function TabsLayout() {
  const { savedListings } = useSelector((state: RootState) => state.main);
  const pathname = usePathname();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: tintColorLight,
        tabBarShowLabel: false,
        headerTitleStyle: { fontFamily: "IBM_Regular" },
        tabBarLabelStyle: {
          fontWeight: "700",
          marginBottom: 2,
        },
        tabBarStyle:
          pathname === "/(tabs)/Chat/conversation"
            ? { display: "none" }
            : { height: 60 },
        tabBarInactiveTintColor: Colors.Gray,
      }}>
      {/* home screen  */}
      <Tabs.Screen
        name="Home"
        options={{
          tabBarAccessibilityLabel: "red",
          tabBarIcon: ({ focused, color, size }) => (
            <Octicons
              name={focused ? "home" : "home"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Octicons
              name={focused ? "search" : "search"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Saved"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Octicons
              name={focused ? "heart-fill" : "heart"}
              color={color}
              size={size}
            />
          ),
          tabBarBadge:
            savedListings?.length > 0 ? savedListings.length : undefined,
        }}
      />
      <Tabs.Screen
        name="Chat"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Octicons
              name={focused ? "person" : "person"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
