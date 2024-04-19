import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import { s3 } from "../../lib/awsS3";

const PreviewScreen = () => {
  const params = useRoute().params;
  const navigation = useNavigation();

  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log(params);
  }, []);

  const publishHandler = () => {
    uploadFileToAWS(params.thumbnail, "image");
    uploadFileToAWS(params.video, "video");
  };

  const uploadFileToAWS = async (file, type) => {
    const fileType = file.split(".").pop();
    const fileName = `snapshare-${Date.now()}.${fileType}`;

    try {
      const data = await s3
        .send(
          new PutObjectCommand({
            Bucket: "snap-share",
            Key: fileName,
            Body: await fetch(file).then((res) => res.blob()),
            ACL: "public-read",
            ContentType:
              type === "video" ? `video/${fileType}` : `image/${fileType}`,
          })
        )
        .then((res) => {
          console.log("File Uploaded!");
          console.log(res);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
          Discard
        </Text>
      </TouchableOpacity>

      <KeyboardAvoidingView>
        <ScrollView style={{ padding: 20 }}>
          <View style={styles.container}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 24 }}>
              Add Details
            </Text>

            <Image
              source={{ uri: params?.thumbnail }}
              resizeMode="cover"
              style={styles.thumbnailImage}
            />

            <TextInput
              numberOfLines={3}
              placeholder="Description"
              onChange={(value) => setDescription(value)}
              style={styles.descriptionBox}
            />

            <TouchableOpacity
              onPress={publishHandler}
              activeOpacity={0.7}
              style={styles.publishBtn}
            >
              <AntDesign name="upload" size={24} color="white" />
              <Text style={styles.btnText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    flexDirection: "row",
    columnGap: 12,
    alignItems: "center",
    paddingTop: 12,
    paddingLeft: 12,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnailImage: {
    width: 200,
    height: 300,
    borderRadius: 12,
    marginTop: 16,
  },
  descriptionBox: {
    borderWidth: 1,
    width: "100%",
    borderRadius: 16,
    marginTop: 24,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.5)",
  },
  publishBtn: {
    flexDirection: "row",
    backgroundColor: "black",
    padding: 12,
    paddingHorizontal: 32,
    justifyContent: "center",
    borderRadius: 99,
    alignItems: "center",
    marginTop: 16,
    width: "100%",
  },
  btnText: {
    color: "white",
    marginLeft: 16,
    fontFamily: "outfit-medium",
    fontSize: 20,
  },
});

export default PreviewScreen;
