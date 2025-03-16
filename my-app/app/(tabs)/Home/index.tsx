import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ListingCard, SafeCard, TopHeader } from "@/components";
import SearchCategory from "@/components/home/SearchCategory";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, hp, wp } from "@/constants";
import {
  handleFetchListings,
  handleGetAllCategories,
  handleGetUserNotifications,
} from "@/utils/actions";
import { showToast } from "@/utils";
import {
  setAllLsiting,
  setCategories,
  setUserNotifications,
} from "@/redux/reducers/main.reducers";
import UpdateProfileModal from "@/components/modals/updateProfileModal";
import HomeSlider from "@/components/home/HomeSlider";
import { router } from "expo-router";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { allListing, categories, notifications } = useSelector(
    (state: RootState) => state.main
  );

  const { conversations } = useSelector((state: RootState) => state.chat);

  const [listingFetchError, setlistingFetchError] = useState<boolean>(false);
  const [categoryFetchError, setcategoryFetchError] = useState<boolean>(false);
  const [refreshing, setrefreshing] = useState<boolean>(false);
  const [modalState, setmodalState] = useState<boolean>(false);

  const fetchAllListing = async () => {
    const res: any = await handleFetchListings();
    if (!res.success) {
      setlistingFetchError(true);
      return showToast(
        "Unable to fetch Listings",
        "error",
        "Please check your network connection."
      );
    }
    setlistingFetchError(false);
    return dispatch(setAllLsiting(res.res.listings.listings));
  };

  const fetchAllCategories = async () => {
    const res = await handleGetAllCategories();
    if (!res.success) {
      setlistingFetchError(true);
      return showToast(
        "Unable to fetch Categories",
        "error",
        "Please check your network connection."
      );
    }
    setcategoryFetchError(false);

    return dispatch(setCategories(res.res.categories));
  };

  const fetchAllNotifications = async () => {
    const res: any = await handleGetUserNotifications(token);
    if (!res.success) {
      setlistingFetchError(true);
      return showToast(
        "Unable to fetch Categories",
        "error",
        "Please check your network connection."
      );
    }
    dispatch(setUserNotifications(res?.res?.getAllNotifications));
  };

  useEffect(() => {
    if (!allListing.length) {
      fetchAllListing();
    }
    if (!categories.length) {
      fetchAllCategories();
    }
    if (!notifications.length && user?._id) {
      fetchAllNotifications();
    }
  }, []);

  const handleRefresh = async () => {
    try {
      setrefreshing(true);
      await fetchAllListing();
      await fetchAllCategories();
      user?._id && (await fetchAllNotifications());
      return showToast("All data refreshed successfully.", "success", "");
    } catch (e: any) {
      return showToast(
        "Unable to fetch some data.",
        "error",
        "Please check your network connection."
      );
    } finally {
      setrefreshing(false);
    }
  };

  return (
    <ScrollView
      scrollEnabled={!refreshing}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      className={`flex-1 w-full`}>
      {modalState && (
        <UpdateProfileModal
          isOpen={modalState}
          setIsOpen={setmodalState}
          title="Update your Preferences"
          titleStyle={{ color: Colors.AscentTwo, fontSize: 22, marginTop: 4 }}
        />
      )}

      {refreshing && (
        <View
          style={{ width: wp(100), height: hp(100) }}
          className={`${
            refreshing && "bg-transparent/40"
          } z-50 absolute top-0 right-0 left-0`}></View>
      )}
      <View className="mb-4" style={{ height: hp(20) }}>
        <TopHeader
          modalOpen={modalState}
          setModalOpen={setmodalState}
          user={user}
        />
      </View>

      <View className="px-[4%] pb-8">
        {/* Home Slsider  */}

        <HomeSlider />
        {/* categories list  */}
        <View className="my-2 flex-row items-center justify-between">
          <Text className="text-2xl  text-Black  font-medium">
            Top Categories
          </Text>

          <TouchableOpacity>
            <Text className="font-bold text-md text-Primary/70">See All</Text>
          </TouchableOpacity>
        </View>
        <SearchCategory categories={categories as any} />
        {/* listing list  */}
        <View className="my-4 flex-row items-center justify-between">
          <Text className="text-2xl  text-Black  font-medium">
            Recommended For You
          </Text>

          <TouchableOpacity onPress={() => router.navigate(`/(tabs)/Search/`)}>
            <Text className="font-bold text-md text-Primary/70">See All</Text>
          </TouchableOpacity>
        </View>
        <View className="w-full">
          {allListing.slice(0, 10).map((item, index) => (
            <ListingCard listing={item} index={index} key={item._id} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
