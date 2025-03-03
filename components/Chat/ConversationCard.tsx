import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ConversationType } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { router } from "expo-router";
import { formatMessageTime } from "@/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants";

type Props = {
  conv: ConversationType;
};

const ConversationCard = ({ conv }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const lastMsg = conv.messages[conv.messages.length - 1].content ?? "";
  const msgTime = conv.messages[conv.messages.length - 1].createdAt ?? "";
  return (
    <TouchableOpacity
      onPress={() =>
        router.navigate(`/(screens)/conversation?cId=${conv?._id}`)
      }
      className="w-full mx-auto rounded-lg bg-white space-x-3  p-4  flex-row relative items-center">
      <View>
        <Image
          source={{
            uri: conv?.participants[1].avatar?.url,
          }}
          className="w-12 h-12 shadow-md shadow-black rounded-full"
          resizeMode="contain"
        />
      </View>
      <View>
        <Text className="text-lg font-semibold">
          {conv?.participants[1].first_name}
        </Text>

        <Text numberOfLines={2} className="w-[60%] text-Gray">
          {lastMsg ?? ""}
        </Text>
      </View>

      <View className="absolute top-2 right-4 space-y-3 ">
        <Text className="font-semibold text-Gray text-mdd">
          {formatMessageTime(msgTime)}
        </Text>

        <View className="shadow-md shadow-black items-center justify-center  bg-Primary rounded-full w-8 h-8 ">
          <MaterialCommunityIcons
            name="arrow-right-top"
            color={Colors.White}
            size={20}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ConversationCard;
