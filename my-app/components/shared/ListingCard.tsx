import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { IListing } from "@/types";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { timeAgo } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { saveUnsaveListing } from "@/redux/reducers/main.reducers";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  listing: IListing;
  index?: number;
};

const ListingCard = ({ listing, index }: Props) => {
  const dispatch = useDispatch();
  const { savedListings } = useSelector((state: RootState) => state.main);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const isExists = savedListings?.findIndex(
      (l) => l._id.toString() === listing._id.toString()
    );
    if (isExists !== -1) {
      setSaved(true);
    } else {
      setSaved(false);
    }
    return () => {};
  }, [saved, savedListings]);

  const formatedownername =
    listing.owner.first_name + " " + listing.owner.last_name.split(" ")[0];

  return (
    <Animated.View
      entering={FadeInDown.delay(200).springify()}
      className="bg-white h-32 w-full flex-row rounded-lg overflow-hidden my-2  shadow-md shadow-Black">
      {/* image box  */}
      <View className="w-[45%] relative h-full">
        <TouchableOpacity
          onPress={() => {
            dispatch(saveUnsaveListing({ ...listing }));
            return setSaved((prev) => !prev);
          }}
          className="absolute top-2 left-2 z-50 bg-white rounded-full p-1">
          <Ionicons
            name={saved ? "heart-sharp" : "heart-outline"}
            color={"red"}
            size={18}
          />
        </TouchableOpacity>

        {/* Image  */}
        <TouchableOpacity
          className="w-full"
          onPress={() =>
            router.push(`/(screens)/ListingDetails?id=${listing._id}`)
          }
          activeOpacity={0.9}>
          <Image
            resizeMode="cover"
            source={{ uri: listing.banners[0].url }}
            className="w-full h-full rounded-lg aspect-video rounded-r-none shadow-lg shadow-black/80"
          />
        </TouchableOpacity>

        <View className="absolute bg-Primary/80 p-1 w-[35%] items-center justify-center rounded-full top-2 right-2">
          <Text className="text-white shadow-md shadow-black font-semibold text-xs">
            {listing?.category?.name}
          </Text>
        </View>
      </View>

      {/* details  */}

      <TouchableOpacity
        onPress={() =>
          router.push(`/(screens)/ListingDetails?id=${listing._id}`)
        }
        activeOpacity={0.9}
        className="bg-White flex-grow p-2 flex-col space-y-1 relative">
        <View className="w-full">
          <Text numberOfLines={1} className="text-lg max-w-[90%] font-bold">
            {listing.name}
          </Text>
        </View>

        <View className="max-w-[80%] flex-row items-center space-x-1">
          <Octicons name="location" size={18} color={"red"} />
          <Text numberOfLines={1} className="max-w-[80%]">
            {listing.address}
          </Text>
        </View>

        <View className="flex-row items-center gap-1">
          <Text numberOfLines={1} className="font-bold text-lg text-Primary">
            From ₹{listing?.monthly_rent}/month
          </Text>
        </View>
        {/* timestamps  */}
        <View className="absolute bottom-2 ml-2">
          {/* owner info  */}

          <Text className="text-gray-400 text-[14px] font-semibold">
            Posted {timeAgo(new Date(listing?.createdAt))}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ListingCard;
