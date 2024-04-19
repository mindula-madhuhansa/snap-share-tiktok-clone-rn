import { useUser } from "@clerk/clerk-expo";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";
import SnapItem from "../../components/snap-item";

const HomeScreen = () => {
  const { user } = useUser();
  const [snapList, setSnapList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadCount, setLoadCount] = useState(0);

  useEffect(() => {
    user && updateProfileImage();
    setLoadCount(0);
  }, [user]);

  useEffect(() => {
    getLatestSnapsList();
  }, [loadCount]);

  const updateProfileImage = async () => {
    const { data, error } = await supabase
      .from("users")
      .update({ profileImgUrl: user?.imageUrl })
      .eq("email", user?.primaryEmailAddress?.emailAddress)
      .is("profileImgUrl", null)
      .select();
  };

  const getLatestSnapsList = async () => {
    setLoading(true);
    const { data: snaps, error } = await supabase
      .from("snaps")
      .select("*,users(username,name,profileImgUrl)")
      .range(loadCount, loadCount + 3)
      .order("id", { ascending: false });

    if (snaps) {
      setSnapList((prev) => [...prev, ...snaps]);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 12,
          paddingTop: 12,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontFamily: "outfit-bold",
            margin: 20,
          }}
        >
          Snap Share
        </Text>

        <Image
          source={{ uri: user?.imageUrl }}
          resizeMode="contain"
          style={{ height: 50, width: 50, borderRadius: 99 }}
        />
      </View>

      <View>
        <FlatList
          data={snapList}
          numColumns={2}
          onRefresh={getLatestSnapsList}
          refreshing={loading}
          onEndReached={() => setLoadCount(loadCount + 4)}
          renderItem={({ item, index }) => <SnapItem snap={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
