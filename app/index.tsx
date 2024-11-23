import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

import { initializeKakaoSDK } from "@react-native-kakao/core";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    initializeKakaoSDK("d6f138e3695774e7f06cfb1c569b29c9");
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Pressable
        onPress={() => {
          router.push("/home");
        }}
      >
        <Text>홈</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          router.push("../login");
        }}
      >
        <Text>로그인페이지</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          router.push("../settings");
        }}
      >
        <Text>환경설정페이지</Text>
      </Pressable>
    </View>
  );
}
