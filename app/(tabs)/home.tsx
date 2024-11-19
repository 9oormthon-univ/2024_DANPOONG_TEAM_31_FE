import { StyleSheet, Text, View } from "react-native";
import HeaderBar from "@/components/header_bar";
import colors from "@/constants/colors";

import Cloud from "@/assets/images/icons/cloud.svg";
import SpeechBubble from "@/assets/images/icons/speech_bubble_default.svg";
import Heart from "@/assets/images/icons/small_fill_heart.svg";
import DarkBlueBubble from "@/assets/images/icons/darkblue_speech_bubble.svg";
import CloudLetter from "@/assets/images/icons/Cloud_letters_big.svg";
import BouncingComponent from "@/components/BouncingComponent";
import { randomPosition } from "../modules/randomPosition";

export default function Home() {
  return (
    <View style={styles.container}>
      <HeaderBar title="민정님, 안녕하세요" />
      <View style={styles.cloudsContainer}>
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <View key={value} style={styles.cloud}>
            <SpeechBubble />
            <Heart style={{ position: "absolute", top: 4.31, right: 10.9 }} />
            <Cloud />
            <Text style={styles.cloudName}>이름이</Text>
          </View>
        ))}
      </View>
      <View style={styles.separator}></View>
      <View style={styles.cloudsBoundary}>
        {[1, 2, 3].map((value) => (
          <View key={value} style={{ position: "absolute", ...randomPosition() }}>
            <BouncingComponent timingIndex={value}>
              <CloudLetter />
            </BouncingComponent>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cloudsContainer: {
    paddingTop: 22,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  cloud: {
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 2.68,
  },
  cloudName: {
    alignSelf: "center",
    color: colors.white,
    fontSize: 10,
    fontWeight: "500",
  },
  separator: {
    marginTop: 11,
    marginHorizontal: 20,
    height: 1,
    backgroundColor: colors.grayA78,
  },
  cloudsBoundary: {
    flex: 1,
    position: "relative",
  },
});
