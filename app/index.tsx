import { Redirect } from "expo-router";

const SplashScreen = () => {
  return <Redirect href={`/(tabs)/Home`} />;
};

export default SplashScreen;
