import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  ScrollView,
  Switch,
  ActivityIndicator,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Colors, hp } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import InputBox from "../shared/InputBox";
import { handleProfileUpdateAction } from "@/utils/actions";
import { showToast } from "@/utils";
import { updateToken, updateUser } from "@/redux/reducers/auth.reducer";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  titleStyle?: TextStyle;
  onSubmit?: (value: any) => void;
  onCancle?: (value: any) => void;
};

const UpdateProfileModal = ({
  isOpen,
  setIsOpen,
  title,
  titleStyle,
  onCancle,
  onSubmit,
}: Props) => {
  const dispatch = useDispatch();

  const { user, token } = useSelector((state: RootState) => state.auth);

  const [updateDetails, setupdateDetails] = useState({
    city: user?.recomendation?.city ? user?.recomendation?.city : "",
    Hostel: user?.recomendation?.Hostel ? user?.recomendation?.Hostel : false,
    PG: user?.recomendation?.PG ? user?.recomendation?.PG : false,
    flat: user?.recomendation?.flat ? user?.recomendation?.flat : false,
  });
  const [isopen, setIsopen] = useState(isOpen);
  const [updating, setupdating] = useState<boolean>(false);

  const handlemodalClose = () => {
    setIsOpen(false);
    return setIsOpen(false);
  };

  const handleProfileUpdate = async () => {
    try {
      setupdating(true);
      const updatePayload = {
        recomendation: updateDetails,
      };
      const resp = await handleProfileUpdateAction(updatePayload, token);
      if (!resp.success) {
        setupdating(false);
        return showToast("Someting went wrong", "error", "");
      }

      const updatedUser = resp.res?.updateProfile?.user;
      const updatedToken = resp.res?.updateProfile?.token;
      dispatch(updateUser({ ...updatedUser }));
      dispatch(updateToken(updatedToken));
      showToast(
        "Prefrences updated successfully.",
        "success",
        "Your profile updated successfully."
      );

      setTimeout(() => {
        return handlemodalClose();
      }, 1500);
    } catch (error) {
      return showToast("Someting went wrong", "error", "");
    } finally {
      setupdating(false);
    }
  };

  return !user?._id ? (
    <View className="flex-1 items-center justify-center"></View>
  ) : (
    <Modal
      visible={isopen}
      animationType="slide"
      transparent={true}
      onRequestClose={() => handlemodalClose()}
      hardwareAccelerated={true}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPressOut={() =>
          updating
            ? showToast(
                "Please wait...",
                "info",
                "We are updating your profile."
              )
            : handlemodalClose()
        }>
        {/* modal body  */}
        <View style={styles.modalContainer}>
          <View className=" flex-row items-center justify-center">
            <Text className="text-center  w-8 h-2 rounded-full  bg-gray-200 "></Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text style={titleStyle}>{title}</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="mt-8">
            <InputBox
              value={updateDetails.city}
              lable="update your city"
              onChange={(value) =>
                setupdateDetails((prev) => ({ ...prev, city: value }))
              }
              placeholder={
                user.recomendation.city
                  ? user.recomendation.city
                  : "Add your city"
              }
            />

            <Text className="text-center text-lg font-semibold mt-2 border-b-2 border-gray-200  pb-1 mb-2">
              Prefrense Details
            </Text>

            <View className=" bg-gray-200 py-1 px-4 my-2 w-[90%] mx-auto rounded-lg flex-row items-center justify-between">
              <Text className="text-lg font-semibold">Hostel</Text>
              <Switch
                value={updateDetails.Hostel}
                onValueChange={(value) =>
                  setupdateDetails((prev) => ({ ...prev, Hostel: value }))
                }
              />
            </View>

            <View className=" bg-gray-200 py-1 px-4 my-2 w-[90%] mx-auto rounded-lg flex-row items-center justify-between">
              <Text className="text-lg font-semibold">Flat</Text>
              <Switch
                value={updateDetails.flat}
                onValueChange={(value) =>
                  setupdateDetails((prev) => ({ ...prev, flat: value }))
                }
              />
            </View>

            <View className=" bg-gray-200 py-1 px-4 my-2 w-[90%] mx-auto rounded-lg flex-row items-center justify-between">
              <Text className="text-lg font-semibold">PG</Text>
              <Switch
                value={updateDetails.PG}
                onValueChange={(value) =>
                  setupdateDetails((prev) => ({ ...prev, PG: value }))
                }
              />
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={handleProfileUpdate}
            disabled={updating}
            className={`bg-Primary flex-row items-center justify-center rounded-lg py-4 ${
              updating && "bg-gray-400"
            } p-2`}>
            {updating && (
              <ActivityIndicator size={"small"} color={Colors.White} />
            )}
            <Text
              className={`text-center ${
                updating && "ml-4"
              } text-lg font-semibold text-white `}>
              {updating ? "Updating..." : "Update"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 8,
    height: hp(60),
  },
});

export default UpdateProfileModal;
