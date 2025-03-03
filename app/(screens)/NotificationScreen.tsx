import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { NotificationCard } from "@/components";
import { Colors, hp, wp } from "@/constants";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { handleGetUserNotifications } from "@/utils/actions";
import { showToast } from "@/utils";
import { setUserNotifications } from "@/redux/reducers/main.reducers";

const NotificationScreen = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state: RootState) => state.main);
  const { token } = useSelector((state: RootState) => state.auth);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  // fn
  const fetchAllNotifications = async () => {
    const res: any = await handleGetUserNotifications(token);
    if (!res.success) {
      return showToast(
        "Unable to fetch Categories",
        "error",
        "Please check your network connection."
      );
    }
    dispatch(setUserNotifications(res?.res?.getAllNotifications));
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchAllNotifications();
      return showToast("All notification fetched successfully.", "success", "");
    } catch (error: any) {
      return showToast(
        "Unable to fetch notifications.",
        "error",
        "Please check your internet connection"
      );
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView
      scrollEnabled={!refreshing}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      className="flex-1 py-2 px-[4%]">
      {refreshing && (
        <View
          style={{ width: wp(100), height: hp(100) }}
          className={`${
            refreshing && "bg-transparent/40"
          } z-50 absolute top-0 right-0 left-0 -mx-[4%]`}></View>
      )}
      {notifications.length ? (
        <View>
          {notifications.map((item, index) => (
            <NotificationCard index={index} notification={item} key={index} />
          ))}
        </View>
      ) : (
        <View
          style={{ height: hp(80) }}
          className="flex-1 items-center justify-center">
          <Animated.View
            className={`bg-white py-4 rounded-lg shadow-md w-[90%] items-center jus shadow-black/60`}
            entering={FadeInLeft.delay(100).springify()}>
            <Ionicons color={Colors.Primary} size={40} name="infinite-sharp" />

            <Text className="text-2xl mt-4 font-semibold">
              No notifications yet.
            </Text>

            <Text className=" mb-4 opacity-60 font-medium">
              Please wait until your notifications will be fetched..
            </Text>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
};

export default NotificationScreen;
