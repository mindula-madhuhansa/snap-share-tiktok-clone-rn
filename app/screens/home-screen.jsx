import { useUser } from "@clerk/clerk-expo";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

import { updateProfileImage } from "../../utils/updateProfileImage";

const HomeScreen = () => {
  const { user } = useUser();

  useEffect(() => {
    updateProfileImage(user?.imageUrl, user?.emailAddresses);
  }, [user]);

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
