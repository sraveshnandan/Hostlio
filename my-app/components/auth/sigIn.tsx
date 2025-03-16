import React, { useEffect, useState } from "react";
import * as Device from "expo-device";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { router } from "expo-router";
import { ScrollView } from "react-native";

type Props = {
  onSuccess: (data: string) => void;
};

const SignIn = ({ onSuccess }: Props) => {
  const [deviceId, setDeviceId] = useState<string>("");

  const userInfo = {
    iss: "phmail",
    aud: "user",
    client_id: process.env.EXPO_PUBLIC_CLIENT_ID!,
  };

  const URI = `https://auth.phone.email/log-in?client_id=${userInfo.client_id}&auth_type=4&device=${deviceId}`;

  useEffect(() => {
    const FetchDeviceId = () => {
      const id = Device?.osBuildFingerprint || "";
      setDeviceId(id);
    };
    FetchDeviceId();
  }, []);

  // Handle authentication response from WebView
  const phoneAuthJwt = (event: WebViewMessageEvent) => {
    const encodedJWT = event.nativeEvent.data;
    return onSuccess(encodedJWT);
  };

  return (
    <WebView
      onMessage={phoneAuthJwt}
      className="flex-1"
      source={{ uri: URI }}
    />
  );
};

export default SignIn;
