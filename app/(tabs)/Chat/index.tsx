import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { UnAuthErrBox } from "@/components";
import { useSocket } from "@/providers";
import { GetAllConversation } from "@/utils/chat.utils";
import { setAllConversation } from "@/redux/reducers/chat.reducers";
import ConversationCard from "@/components/Chat/ConversationCard";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { router } from "expo-router";
import { showToast } from "@/utils";

const ChatScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { conversations } = useSelector((state: RootState) => state.chat);

  const { socket } = useSocket();

  const fetchAllConversations = async () => {
    if (user?._id) {
      return;
    }
    const payload = { userId: user?._id };
    const res = await GetAllConversation(payload);
    if (!res?.success) {
      return showToast(
        "Something went wrong.",
        "error",
        "Unable to refresh your conversation list."
      );
    } else {
      dispatch(setAllConversation(res?.conversations));
      return showToast(
        "Conversations Refreshed successfully.",
        "success",
        "Your conversation list is up to date."
      );
    }
  };
  useEffect(() => {
    fetchAllConversations();
  }, []);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchAllConversations();
    } catch (error) {
      return Alert.alert(
        "Something went wrong",
        "Please retry after sometime."
      );
    } finally {
      setRefreshing(false);
    }
  };
  return !user?._id ? (
    <UnAuthErrBox message="Please Login Register to See your chats" />
  ) : (
    <View className="flex-1 w-full py-2">
      {conversations.length > 0 ? (
        <ScrollView
          scrollEnabled={!refreshing}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          className="flex-1 w-full px-[4%]"
          contentContainerStyle={{
            justifyContent: "center",
            gap: 12,
          }}
        >
          {conversations.map((item) => (
            <ConversationCard key={item?._id} conv={item} />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Animated.View
            className={`bg-white p-3 w-[80%] items-center justify-center  rounded-lg`}
            entering={FadeInDown.delay(200).springify()}
          >
            <Ionicons
              name="chatbubbles-outline"
              size={68}
              color={Colors.Primary}
            />

            <Text className="text-red-500 font-semibold text-xl mt-3">
              No Conversations Found.
            </Text>

            <TouchableOpacity
              onPress={() => router.navigate(`/(tabs)/Search/`)}
              className="bg-Primary items-center justify-center px-4 shadow-lg shadow-black py-3 rounded-full mt-4"
            >
              <Text className="text-white font-semibold">Explore Listings</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
