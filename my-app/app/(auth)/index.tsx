import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import SignIn from "@/components/auth/sigIn";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/reducers/auth.reducer";
import { RootState } from "@/redux/store";
import { showToast } from "@/utils";

const SignInScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoading, isError, isSuccess, user, errMSg } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSignIn = async (token: string) => {
    const payload = {
      token,
      role: "user",
    };

    try {
      setLoading(true);
      dispatch(login(payload) as any);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      return router.replace(`/(tabs)/Home/`);
    }

    if (isError) {
      return showToast(errMSg, "error", "Please try again.");
    }
  }, [isSuccess, isLoading, user]);
  return (
    <View className="flex-1 bg-white relative py-[15%]">
      <TouchableOpacity
        className="absolute top-4 bg-white shadow-lg shadow-black/40 px-4 rounded-2xl py-2 right-[10%]"
        onPress={() => router.replace(`/(tabs)/Home/`)}
      >
        <Text className="text-Primary font-semibold">Skip</Text>
      </TouchableOpacity>
      <SignIn onSuccess={(token) => handleSignIn(token)} />
    </View>
  );
};

export default SignInScreen;
