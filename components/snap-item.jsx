import { View, Text, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SnapItem = ({ snap }) => {
  return (
    <View style={{ flex: 1, margin: 5 }}>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          bottom: 0,
          padding: 10,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Image
            source={{ uri: snap?.users?.profileImgUrl }}
            resizeMode="cover"
            style={{
              width: 20,
              height: 20,
              borderRadius: 99,
              backgroundColor: "white",
            }}
          />
          <Text
            style={{
              color: "white",
              fontFamily: "outfit-regular",
              fontSize: 10,
            }}
          >
            {snap?.users?.name}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text
            style={{
              fontFamily: "outfit-regular",
              fontSize: 10,
              color: "white",
            }}
          >
            36
          </Text>
          <AntDesign name="hearto" size={16} color="white" />
        </View>
      </View>

      <Image
        source={{ uri: snap?.imageUrl }}
        style={{ width: "100%", height: 250, borderRadius: 10 }}
        resizeMode="cover"
      />
    </View>
  );
};

export default SnapItem;
