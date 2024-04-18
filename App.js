import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import LoginScreen from "./app/screens/login-screen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("./assets/fonts/Outfit-Medium.ttf"),
    "outfit-regular": require("./assets/fonts/Outfit-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <LoginScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
