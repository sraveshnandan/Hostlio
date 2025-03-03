import { setAllConversation } from "@/redux/reducers/chat.reducers";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const SplashScreen = () => {
  const dispatch = useDispatch();
  // final useEffect to run api call to load data
  useEffect(() => {
    return () => {};
  }, []);
  return <Redirect href={`/(tabs)/Home`} />;
};

export default SplashScreen;
