import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Colors,
  socialLinks,
  SupportLinks,
  UserProfileLinks,
} from "@/constants";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { RootState } from "@/redux/store";
import { HelpModel, UnAuthErrBox } from "@/components";
import * as Linking from "expo-linking";
import { IUserProfilLinks } from "@/types";
import Animated, { FadeInDown } from "react-native-reanimated";
import { logout } from "@/redux/reducers/auth.reducer";
import { removeAlldata } from "@/redux/reducers/main.reducers";
import { showToast } from "@/utils";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [modelOpen, setmodelOpen] = useState(false);

  const handleBtnClick = (data: any) => {
    if (data.link) {
      return router.push(data.link);
    }
    if (data.name === "Support & FAQ") {
      return setmodelOpen(true);
    }
    if (data.name === "Give Feedback") {
      return Linking.openURL(
        `https://play.google.com/store/apps/details?id=com.xecurecode.hostlio&hl=en`
      );
    }
  };

  const handleLogOut = async () => {
    dispatch(logout());
    dispatch(removeAlldata());
    showToast("Logged out successfully.", "success", "");
    return router.replace(`/(auth)/`);
  };

  return !user?._id ? (
    <UnAuthErrBox message="Please Login to view your profile." />
  ) : (
    <>
      {/* help model  */}
      <HelpModel isopen={modelOpen} setIsOpen={setmodelOpen} />
      <ScrollView className="flex-1  px-[5%] bg-White">
        {/* user profileImage  */}
        <View className="p-2 justify-center items-center my-4 rounded-xl  min-h-[180px]">
          <View className="w-36 h-36 rounded-full  border-opacity-10  p-1">
            <Image
              className="rounded-full object-contain  h-[99%] w-[99%] shadow-md shadow-black "
              source={{ uri: user?.avatar?.url }}
              width={10}
              height={10}
            />
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/Profile/editProfile")}
              className="absolute top-3 -right-1 bg-white shadow-md shadow-black/60 p-2 rounded-full"
            >
              <MaterialCommunityIcons
                name="pen"
                size={20}
                color={Colors.Primary}
              />
            </TouchableOpacity>
          </View>
          <Text className="mt-2 text-Primary font-bold text-2xl">
            {user.first_name + " " + user.last_name}
          </Text>
          <Text className="text-gray-600 font-semibold text-sm">
            +91 {user?.phone_no}
          </Text>
        </View>

        <Text className="text-2xl font-semibold my-4">Account Settings</Text>
        {UserProfileLinks.map((item: IUserProfilLinks, index: number) => (
          <TouchableOpacity
            onPress={() => handleBtnClick(item)}
            className={`border-b-[1px] ${
              index === UserProfileLinks.length - 1 && " border-b-0"
            } mb-2 p-2 m flex-row items-center border-b-1 border-slate-200 mt-2`}
            key={index}
          >
            {/* icon  */}
            <View className="bg-slate-200 p-2 rounded-lg">
              <Ionicons
                name={item.icon as any}
                size={25}
                className="font-bold"
                color={item.name === "Sign Out" ? "red" : Colors.Primary}
              />
            </View>

            <View className="flex-grow mx-2 flex-row items-center justify-between">
              <Text
                className={`text-lg ${
                  item.name === "Sign Out" && "text-red-500"
                } font-semibold`}
              >
                {item.name}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={item.name === "Sign Out" ? "red" : Colors.Primary}
              />
            </View>
          </TouchableOpacity>
        ))}
        <Text className="text-2xl font-semibold my-4">Support</Text>
        {SupportLinks.map((item: IUserProfilLinks, index: number) => (
          <TouchableOpacity
            onPress={() => handleBtnClick(item)}
            className={`border-b-[1px] ${
              index === UserProfileLinks.length - 1 && " border-b-0"
            } mb-2 p-2 m flex-row items-center border-b-1 border-slate-200 mt-2`}
            key={index}
          >
            {/* icon  */}
            <View className="bg-slate-200 p-2 rounded-lg">
              <Ionicons
                name={item.icon as any}
                size={25}
                className="font-bold"
                color={item.name === "Sign Out" ? "red" : Colors.AscentTwo}
              />
            </View>

            <View className="flex-grow mx-2 flex-row items-center justify-between">
              <Text
                className={`text-lg ${
                  item.name === "Sign Out" && "text-red-500"
                } font-semibold`}
              >
                {item.name}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={item.name === "Sign Out" ? "red" : Colors.AscentTwo}
              />
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={() => handleLogOut()}
          className="bg-gray-300 my-4 flex-row items-center justify-center py-3 rounded-lg shadow-md shadow-black/40"
        >
          <Text className="font-semibold text-lg">Log Out</Text>
        </TouchableOpacity>

        {/* copyright  */}

        <TouchableOpacity
          onPress={() => Linking.openURL(`https://xecurecode.in`)}
          className="items-center justify-center mb-8 mt-4"
        >
          <Text className="text-gray-300">
            {" "}
            Designed and developed by <Text>XecureCode</Text>
          </Text>
        </TouchableOpacity>
        {/* social links  */}
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          className="bg-gray-200  rounded-lg shadow-md shadow-black/40 flex-row items-center justify-around p-2 "
        >
          {socialLinks.map((item, index) => (
            <TouchableOpacity
              onPress={() => Linking.openURL(item.link)}
              key={index}
              className="p-2 rounded-full bg-white"
            >
              {item.name === "telegram" ? (
                <MaterialIcons name="telegram" size={22} />
              ) : (
                <MaterialCommunityIcons name={item.name as any} size={22} />
              )}
            </TouchableOpacity>
          ))}
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
