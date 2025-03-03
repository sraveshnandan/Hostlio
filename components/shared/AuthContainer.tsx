import React, { ReactNode } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
  verticallyCenter?: boolean;
};

const AuthContainer = ({ children, verticallyCenter }: Props) => {
  return (
    <SafeAreaView
      className={`flex-1  ${
        verticallyCenter && "justify-center"
      } px-[5%] pt-24`}>
      {children}
    </SafeAreaView>
  );
};

export default AuthContainer;
