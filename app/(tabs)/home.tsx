import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderBar from "@/components/header_bar";
import MainWhale from "@/assets/images/icons/whale_w_mail_bubble.svg";
import BackgroundImg from "@/assets/images/background.svg";

export default function Home() {
  return (
    <View style={styles.container}>
      {/* 배경 이미지 */}
      <BackgroundImg width="100%" height="100%" style={styles.backgroundImg} />

      {/* 내용 */}
      <HeaderBar title="민정님, 안녕하세요" />
      <MainWhale width={92} height={139.68} style={styles.mainWhale} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundImg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mainWhale: {
    alignSelf: "center",
    position: "absolute",
    top: 450,
  },
});
