import { View, Text } from "react-native";
import React from "react";
import { Inotifications } from "@/types";
import Animated, { FadeInDown } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { timeAgo } from "@/utils";

type Props = {
  notification: Inotifications;
  index: number;
};

const NotificationCard = ({ notification, index }: Props) => {
  return (
    <Animated.View
      className={`w-full bg-white rounded-lg p-2 my-2`}
      entering={FadeInDown.delay(index * 100).springify()}>
      <View className="flex-row  items-center justify-between">
        <MaterialCommunityIcons
          name="bell-badge-outline"
          size={22}
          color={Colors.Primary}
        />
        <Text className="text-gray-400 text-sm">
          {timeAgo(new Date(notification.createdAt))}
        </Text>
      </View>

      <Text className="mt-2 text-lg font-semibold">{notification.title}</Text>
      <Text className="mt-2 text-md font-medium text-gray-400">
        {notification.description}
      </Text>
    </Animated.View>
  );
};

export default NotificationCard;
