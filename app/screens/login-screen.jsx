import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={styles.container}>
        <Video
          style={styles.video}
          source={require("../../assets/videos/main.mp4")}
          shouldPlay
          resizeMode={ResizeMode.COVER}
          isLooping={true}
        />

        <View style={styles.textContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.titleText}>Snap Share</Text>
            <Text style={styles.descriptionText}>
              Share your Snap around the world with just one click!
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => cc3}
            activeOpacity={0.7}
            style={styles.buttonContainer}
          >
            <Image
              source={require("../../assets/images/google.png")}
              alt="Google Logo"
              resizeMode="contain"
              style={{ height: 28, width: 28 }}
            />
            <Text style={styles.buttonText}>Sign In with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    height: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 64,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontFamily: "outfit-bold",
    color: "white",
    fontSize: 32,
  },
  descriptionText: {
    fontFamily: "outfit-regular",
    color: "white",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 99,
  },
  buttonText: {
    fontFamily: "outfit-medium",
    marginLeft: 8,
    fontSize: 16,
  },
});

export default LoginScreen;
