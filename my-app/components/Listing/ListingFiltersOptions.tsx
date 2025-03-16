import { View, Text } from "react-native";
import React from "react";
import { IExtraDetails, IListing } from "@/types";

type Props = {
  options: IExtraDetails;
  listing: IListing;
};

const ListingFiltersOptions = ({ options, listing }: Props) => {
  return (
    <View className="w-full flex-wrap flex-row items-center  my-4">
      <View
        className={`bg-gray-200 m-2 px-3 py-2 flex-row items-center rounded-full ${
          listing?.extra?.for_all && "bg-Primary/70 font-bold"
        }`}>
        <Text
          className={`font-semibold ${
            listing?.extra?.for_all && "text-white"
          } mr-2`}>
          For All
        </Text>
      </View>
      <View
        className={`bg-gray-200 m-2 px-3 py-2 flex-row items-center rounded-full ${
          listing?.extra?.for_boys && "bg-Primary/70 font-bold"
        }`}>
        <Text
          className={`font-semibold mr-2 ${
            listing?.extra?.for_boys && "text-White"
          }`}>
          For Boys
        </Text>
      </View>

      <View
        className={`bg-gray-200 m-2 px-3 py-2 flex-row items-center rounded-full ${
          listing?.extra?.for_girls && "bg-Primary/70 font-bold"
        }`}>
        <Text
          className={`font-semibold mr-2 ${
            listing?.extra?.for_girls && "text-White"
          }`}>
          For Girls
        </Text>
      </View>

      <View
        className={`bg-gray-200 m-2 px-3 py-2 flex-row items-center rounded-full ${
          listing?.extra?.for_family === true && "bg-Primary/70 font-bold"
        }`}>
        <Text
          className={`font-semibold mr-2 ${
            listing?.extra?.for_family && "text-White"
          }`}>
          For Family
        </Text>
      </View>
    </View>
  );
};

export default ListingFiltersOptions;
