import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";

const CreateScreen = () => {
  const navigation = useNavigation();

  const selectVideoFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      generateVideoThumbnail(result.assets[0].uri);
    }
  };

  const generateVideoThumbnail = async (videoUri) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
        time: 10000,
      });

      navigation.navigate("preview-screen", {
        video: videoUri,
        thumbnail: uri,
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/folder.png")}
        resizeMode="cover"
        style={{ height: 120, width: 120 }}
      />
      <Text style={{ fontFamily: "outfit-bold", fontSize: 28 }}>
        Share your Snap
      </Text>
      <Text style={{ fontFamily: "outfit-regular", fontSize: 16 }}>
        Let's show your creativity to the world.
      </Text>

      <TouchableOpacity
        onPress={selectVideoFile}
        activeOpacity={0.7}
        style={styles.createButton}
      >
        <AntDesign name="pluscircleo" size={24} color="white" />
        <Text style={styles.btnText}>Create</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  createButton: {
    flexDirection: "row",
    backgroundColor: "black",
    padding: 12,
    paddingHorizontal: 32,
    borderRadius: 99,
    alignItems: "center",
    marginTop: 40,
  },
  btnText: {
    color: "white",
    marginLeft: 8,
    fontFamily: "outfit-medium",
    fontSize: 20,
  },
});

export default CreateScreen;
