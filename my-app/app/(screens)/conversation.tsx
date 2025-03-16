import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { GetAllMessages, SendMessage } from "@/utils/chat.utils";
import { formatMessageTime, showToast } from "@/utils";
import {
  addMessageToConversation,
  updateConversation,
} from "@/redux/reducers/chat.reducers";
import { IMessage } from "@/types";

type Props = {};

const ConversationScreen = (props: Props) => {
  const { cId } = useLocalSearchParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { conversations } = useSelector((state: RootState) => state.chat);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const flatListRef = useRef<FlatList<any>>(null);
  const [message, setMessage] = useState<string>("");

  const navigation = useNavigation();
  const participantConv = conversations.find(
    (c) => c._id.toString() === cId.toString()
  );

  const otherUser = participantConv?.participants.find(
    (u) => u._id.toString() !== user?._id
  );

  const fetchAllMessages = async () => {
    try {
      setLoading(true);
      const res = await GetAllMessages(cId as string);
      if (res.success) {
        dispatch(updateConversation(res?.conversation));
      }
    } catch (error) {
      showToast("Unable to fetch messages", "error", "");
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Colors.Primary,
      },
      headerTitle: "",
      headerLeft: () => (
        <View className="flex-row items-center space-x-4">
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.White}
            onPress={() => router.back()}
          />
          <View className="flex-row items-center space-x-3">
            <Image
              source={{ uri: otherUser?.avatar?.url }}
              className="w-10 h-10 rounded-full"
            />
            <Text className="text-white text-lg font-semibold">
              {otherUser?.first_name}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleRefresh} disabled={refreshing}>
          <MaterialCommunityIcons
            name="refresh"
            color={refreshing ? "gray" : Colors.White}
            size={24}
          />
        </TouchableOpacity>
      ),
    });

    fetchAllMessages();
  }, [navigation]);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchAllMessages();
    } catch (error) {
      showToast("Failed to refresh messages", "error", "");
    } finally {
      setRefreshing(false);
    }
  };

  const handleSendMessage = async () => {
    if (message.length < 3) return;
    try {
      const payload = {
        conversationId: cId as string,
        content: message,
        senderId: user?._id,
      };
      const res = await SendMessage(payload);
      if (res.success) {
        dispatch(
          addMessageToConversation({ con_id: cId, message: res.message })
        );
        setMessage("");
      }
    } catch (error) {
      showToast("Message sending failed", "error", "");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1">
      {/* Loading Indicator */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={Colors.Primary} />
          <Text className="text-gray-500 mt-3">Loading messages...</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={participantConv?.messages || []}
          keyExtractor={(item) => item._id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          renderItem={({ item }: { item: IMessage }) => {
            const isMe = item.sender.toString() === user?._id.toString();
            return (
              <View
                className={`flex-row shadow-md items-end my-2 ${
                  isMe ? "justify-end" : "justify-start"
                }`}>
                {!isMe && (
                  <Image
                    source={{
                      uri: otherUser?.avatar?.url,
                    }}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <View
                  className={`p-3 rounded-lg max-w-[70%] ${
                    isMe ? "bg-blue-500" : "bg-gray-300"
                  }`}>
                  <Text className="text-white font-semibold">
                    {item.content}
                  </Text>
                  <Text className="text-gray-200 text-sm text-right mt-1">
                    {formatMessageTime(item.createdAt)}
                  </Text>
                </View>
              </View>
            );
          }}
          contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 80 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />
      )}

      {/* MESSAGE INPUT BOX */}
      <View className="absolute bottom-0 left-0 right-0 p-3 bg-gray-300 flex-row items-center">
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="gray"
          className="flex-1 bg-white text-lg font-semibold text-black p-3 rounded-full shadow-md"
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          disabled={message.length < 3}
          className={`ml-2 rounded-full p-3 ${
            message.length >= 3 ? "bg-blue-500" : "bg-gray-400"
          }`}>
          <Ionicons
            name="send"
            size={24}
            color={message.length < 3 ? "gray" : "white"}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ConversationScreen;
