import { useFonts } from "expo-font";
import { StyleSheet, Text } from "react-native";
import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-get-random-values";

import LoginScreen from "./app/screens/login-screen";
import TabNavigation from "./app/navigations/tab-navigation";

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
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
