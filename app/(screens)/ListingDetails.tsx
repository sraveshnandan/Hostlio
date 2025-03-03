import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CreateNewConversationPayload, IListing } from "@/types";
import { ListingFiltersOptions } from "@/components";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { AmenitiesWithIcon, Colors, playstorelink } from "@/constants";
import * as Linking from "expo-linking";
import { showToast } from "@/utils";
import { saveUnsaveListing } from "@/redux/reducers/main.reducers";
import ImageSlider from "@/components/Listing/ImageSlider";
import { CreateNewConversation } from "@/utils/chat.utils";

const ListingDetails = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { allListing, savedListings } = useSelector(
    (state: RootState) => state.main
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const params = useLocalSearchParams();

  const [listing, setListing] = useState<IListing>(
    allListing.find((l) => l._id.toString() === params.id.toString()) as any
  );

  const [mainBanner, setMainBanner] = useState<string>(listing.banners[0].url);
  const [saved, setSaved] = useState(false);
  const [imageModelState, setImageModelState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // handling listing connect

  const handleConnect = async () => {
    if (!user?._id) {
      return router.navigate(`/(auth)/`);
    }

    try {
      setLoading(true);
      const payload: CreateNewConversationPayload = {
        listingId: listing?._id,
        userId: user?._id,
        ownerId: listing?.owner?._id,
      };
      const res = await CreateNewConversation(payload);
      if (res?.success) {
        showToast(
          "Conversation  Created Successfully.",
          "success",
          "You  can proceed to chat screen to continue."
        );
        return router.navigate(`/(tabs)/Chat/`);
      } else {
        return showToast(
          " Unable to create Conversation.",
          "error",
          `${res?.message}`
        );
      }
    } catch (error) {
      return showToast(
        "Unable to Create Chat Request",
        "error",
        "Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCallAction = async () => {
    if (listing?.contact_no) {
      return Linking.openURL(`tel:${listing?.contact_no}`);
    } else {
    }
  };

  const handleShare = async () => {
    try {
      const message = ` Looking for a Hostel, PG, or Flat? Hostlio Has You Covered! 🔍🏡 \nCheck this out: ${playstorelink}`;

      await Share.share({
        message,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: listing.name.substring(0, 15),
      headerRight: () => (
        <View className="flex-row items-center gap-2 justify-center ">
          <TouchableOpacity
            onPress={() => {
              dispatch(saveUnsaveListing({ ...listing }));
              return setSaved((prev) => !prev);
            }}
            className="bg-white rounded-full p-2">
            <Ionicons
              name={saved ? "heart-sharp" : "heart-outline"}
              color={"red"}
              size={22}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleShare()}
            className="bg-white rounded-full p-2">
            <Ionicons name={"share-social"} color={Colors.Primary} size={22} />
          </TouchableOpacity>
        </View>
      ),
    });
    const isExists = savedListings.findIndex(
      (l) => l._id.toString() === listing._id.toString()
    );
    if (isExists !== -1) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [params]);

  // formatted Amenities

  const formattedAmenities = AmenitiesWithIcon.filter((a) =>
    listing?.facilities.includes(a.name)
  );

  return (
    <>
      <ScrollView
        scrollEnabled={!loading}
        className="flex-col pb-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: "3%" }}>
        {/* banners slider  */}

        <View className="">
          <ImageSlider images={listing?.banners} />
          {listing?.video?.url && (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  listing?.video?.url ?? "https://hostlio.in/not-found"
                )
              }
              className="flex-row p-2 w-fit gap-1 absolute justify-center bg-White bottom-8 right-5 items-center rounded-lg">
              <Ionicons name="logo-youtube" size={22} color={"red"} />
              <Text
                numberOfLines={1}
                className="text-Primary/70 font-bold shadow-lg shadow-black/70">
                Video Available
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* details  */}

        <View className="mt-2 mb-4">
          <View className="flex-row items-center justify-between">
            <Text numberOfLines={2} className="text-2xl font-semibold">
              {listing.name}
            </Text>
            <View className="border-l-[.8px] items-center pl-2">
              <Text numberOfLines={1} className="text-lg">
                Starting From
              </Text>
              <Text
                numberOfLines={1}
                className="text-lg text-Primary font-medium">
                ₹ {listing.monthly_rent}/month
              </Text>
            </View>
          </View>

          {/* address  */}
          <View className="w-full">
            <View className="flex-row items-center gap-2 mt-2">
              <Octicons name="location" color={"red"} size={22} />
              <Text
                numberOfLines={3}
                className="text-[14px] max-w-[80%] mt-1 opacity-70 font-medium">
                {listing.address}
              </Text>
            </View>
          </View>
        </View>

        <View className="my-4">
          {/* category  */}
          <View className="flex-row items-center mb-4">
            <View className="flex-row bg-white/40   p-2 rounded-md flex-grow  items-center">
              <Image
                source={{ uri: listing.category.image.url }}
                className="w-12 h-12 rounded-md shadow-md shadow-black"
              />
              <Text className="text-Primary text-xl ml-4">
                {listing.category.name}
              </Text>
            </View>
            <View className="w-[40%] border-l-[0.5px] pl-4 items-center justify-center">
              <Text className="text-md font-semibold">Posted on</Text>
              <Text className="text-Primary font-medium text-lg">
                {new Date(listing.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View className="mt-2 mb-4">
            <Text className="text-2xl opacity-75 text-gray-500 font-medium">
              Restrictions
            </Text>
            <ListingFiltersOptions listing={listing} options={listing.extra} />
          </View>

          {/* description  */}
          <Text className="text-2xl opacity-75 text-gray-500 font-medium">
            Description
          </Text>

          <Text numberOfLines={8} className="opacity-70 mt-1 text-md">
            {listing.extra.details}
          </Text>

          {/* timings  */}
          <Text className="text-2xl opacity-75 text-gray-500 font-medium my-4">
            Time Table
          </Text>
          <View className=" flex-row items-center justify-between gap-2">
            <View className="w-[45%] py-2 rounded-md bg-gray-200 items-center justify-center ">
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/1234/1234189.png",
                }}
                className="w-10 h-10 aspect-square"
              />
              <Text className="mt-1 text-lg font-semibold">
                {listing.opening_time}
              </Text>
            </View>

            <View className="w-[45%] py-2 rounded-md bg-gray-200   items-center justify-center ">
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/1234/1234190.png",
                }}
                className="w-10 h-10 aspect-square"
              />
              <Text className="mt-1 text-lg font-semibold">
                {listing.closing_time}
              </Text>
            </View>
          </View>

          {/* facilities  */}
          <View className="my-4">
            <Text className="text-2xl opacity-75 text-gray-500 font-medium my-4">
              Amenities
            </Text>

            <View className="flex-row flex-wrap gap-3">
              {formattedAmenities?.map((item, index) => (
                <View
                  className="rounded-full px-3 bg-White shadow-lg shadow-black/40 flex-row items-center gap-2 justify-center"
                  key={index}>
                  <Image
                    tintColor={Colors.Primary}
                    source={{ uri: item.icon }}
                    className="w-8 h-8 aspect-square"
                  />
                  <Text className="text-md text-Black font-semibold">
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* distances  */}

          <View>
            <Text className="text-2xl opacity-75 text-gray-500 font-medium mb-4">
              Distances
            </Text>

            <View className="flex-row mb-2 border-b-[0.6px] border-b-neutral-400 pb-2 items-center justify-between">
              <Text className="text-lg font-semibold">Library</Text>
              <Text className="text-lg bg-white px-3 py-1 rounded-md font-medium">
                {listing.extra.distance.library / 1000} KM
              </Text>
            </View>

            <View className="flex-row mb-2 border-b-[0.6px] border-b-neutral-400 pb-2 items-center justify-between">
              <Text className="text-lg font-semibold">Railway Station</Text>
              <Text className="text-lg bg-white px-3 py-1 rounded-md font-medium">
                {listing.extra.distance.railway_station / 1000} KM
              </Text>
            </View>

            <View className="flex-row mb-2 border-b-[0.6px] border-b-neutral-400 pb-2 items-center justify-between">
              <Text className="text-lg font-semibold">Mall</Text>
              <Text className="text-lg bg-white px-3 py-1 rounded-md font-medium">
                {listing.extra.distance.mall / 1000} KM
              </Text>
            </View>

            <View className="flex-row mb-2 border-b-[0.6px] border-b-neutral-400 pb-2 items-center justify-between">
              <Text className="text-lg font-semibold">Medical Shop</Text>
              <Text className="text-lg bg-white px-3 py-1 rounded-md font-medium">
                {listing.extra.distance.medical_shop / 1000} KM
              </Text>
            </View>
          </View>

          {/* owner details  */}

          <View className="w-full  my-4 bg-white py-3 rounded-lg shadow-lg shadow-black/70 px-[4%] flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Image
                source={{ uri: listing.owner.avatar.url }}
                className="w-10 h-10 rounded-full"
              />
              <View className="ml-2">
                <Text className=" text-md font-medium">
                  {listing.owner.first_name} {listing.owner.last_name}{" "}
                  <Octicons name="verified" color={"green"} />
                </Text>
                <Text className="text-[10px]">Posted by verified owner</Text>
              </View>
            </View>

            {/* view profile button  */}

            <TouchableOpacity
              onPress={() =>
                showToast(
                  "Owner is'nt allowed to view their profile",
                  "info",
                  ""
                )
              }
              className="border-2 px-2 border-Primary py-1 rounded-lg">
              <Text className="text-md font-medium">View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Connect button  */}

      <View className=" bg-white px-4 py-2 gap-4 flex-row items-center justify-between">
        {listing?.is_call_allowed && (
          <TouchableOpacity
            onPress={() => handleCallAction()}
            className="bg-green-500 rounded-lg w-fit p-3">
            <Ionicons name="call-outline" size={28} color={Colors.White} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleConnect}
          disabled={loading}
          className={`shadow-md w-fit flex-grow shadow-black/60 py-3 rounded-lg bg-Primary/70 flex-row items-center justify-center space-x-4 ${
            loading && "bg-Secondry"
          }`}>
          {loading ? (
            <ActivityIndicator color={Colors.White} />
          ) : (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={26}
              color={Colors.White}
            />
          )}

          <Text className="text-white text-lg ">Chat Now</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ListingDetails;
