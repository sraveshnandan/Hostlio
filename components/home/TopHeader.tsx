import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Colors, hp } from "@/constants";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import BottomSheetComponent from "./withBottomSheet";
import InputBox from "../shared/InputBox";
import SearchBar from "./SearchBar";
import { getGreeting } from "@/utils";
import { IUser } from "@/types";

type Props = {
  user: IUser;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const TopHeader = ({ user, modalOpen, setModalOpen }: Props) => {
  const [modelOpen, setmodelOpen] = useState(modalOpen);

  return (
    <View style={styles.container}>
      <View className="w-full  p-2 flex-row justify-between items-center">
        <View className="flex-row">
          {user?._id && (
            <TouchableOpacity
              onPress={() => router.navigate(`/(tabs)/Profile/`)}>
              <Image
                source={{ uri: user?.avatar?.url }}
                style={styles.userAvatar}
              />
            </TouchableOpacity>
          )}
          <View className="flex-col ml-2">
            <View className="flex-row items-center gap-1">
              <Text className="text-white line-clamp-1  text-xl font-semibold">{`${getGreeting()}`}</Text>
              <Text className="text-white line-clamp-1  text-xl font-bold">{`${
                user?.first_name ?? ""
              }`}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setmodelOpen((prev) => !prev);
                return setModalOpen(!modalOpen);
              }}
              className="flex-row items-center">
              <Ionicons name="location" color={Colors.White} />
              <Text className="flex-row mx-1 text-white justify-center text-[12px] items-center">
                {user?.recomendation?.city
                  ? user?.recomendation?.city
                  : "Change City"}{" "}
              </Text>
              <Ionicons name="chevron-down" color={Colors.White} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push(`/(screens)/NotificationScreen`)}
          className="">
          <Octicons
            name="bell"
            size={25}
            color={Colors.White}
            className="font-semibold"
          />
        </TouchableOpacity>
      </View>
      <SearchBar />
      <BottomSheetComponent
        modelContents={
          <View>
            <InputBox lable="input" onChange={() => console.log("hi")} />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    position: "absolute",
    left: 0,
    right: 0,
    padding: "4%",
    backgroundColor: Colors.Primary,
    borderBottomEndRadius: 12,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});

export default TopHeader;
