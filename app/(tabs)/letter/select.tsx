import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MicrophoneBtn from "@/assets/images/icons/microphone_btn.svg";
import ImgTextBtn from "@/assets/images/icons/img_text_btn.svg";
import LeftArrow from "@/assets/images/icons/left_arrow.svg";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";
import HeaderBar from "@/components/header_bar";

export default function Select() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <HeaderBar title="어떤 메세지를 보낼까요?" />
      <View style={styles.mainContainer}>
        {/* 왼쪽 화살표 */}
        <TouchableOpacity style={styles.leftArrow} onPress={() => router.back()}>
          <LeftArrow width={6} height={12} />
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          {/* 음성 버튼 */}
          <TouchableOpacity
            style={styles.voiceButton}
            onPress={() => router.push("/letter/voice_message")}
          >
            <MicrophoneBtn width={103} height={103} />
            <Text style={styles.buttonText}>음성</Text>
          </TouchableOpacity>

          {/* 텍스트 버튼 */}
          <TouchableOpacity style={styles.textButton} onPress={() => router.push("/letter/text_message")}>
            <ImgTextBtn width={103} height={103} />
            <Text style={styles.buttonText}>텍스트</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    alignItems: "center",
    position: "relative",
  },
  leftArrow: {
    position: "absolute",
    left: 30,
    top: 280,
  },
  buttonContainer: {
    alignItems: "center",
    alignSelf: "center",
    marginTop: 230,
    flexDirection: "row",
  },
  voiceButton: {
    marginRight: 38,
  },
  textButton: {

  },
  buttonText: {
    marginTop: 10,
    fontSize: 20,
    color: colors.white,
    fontWeight: "500",
    textAlign: "center",
  },
});
