import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import RootNavigation from "./navigation/RootNavigation";

LogBox.ignoreLogs([
  `Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property. This API will be removed in SDK 45.`,
]);

export default function App() {
  return (
    <>
      <RootNavigation />
    </>
  );
}

registerRootComponent(App);
