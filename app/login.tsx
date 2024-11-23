import React, { useEffect } from "react";
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import HeartWhale from "@/assets/images/icons/heart_whale.svg";
import KakaoLogin from "@/assets/images/icons/kakao_login.svg";
import BackgroundImg from "@/assets/images/background.svg";
import HeaderBar from "@/components/header_bar";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";

import { login, isLogined } from "@react-native-kakao/user";

export default function Login() {
  const router = useRouter();

  const initKakao = async () => {
    if (await isLogined()) {
      console.log("logged in");
    } else {
      login({
        web: {
          redirectUri: "http://15.164.29.113:8080/login/oauth2/code/kakao",
        },
      })
        .then((result) => {
          console.log(result);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 배경 이미지 */}
      <BackgroundImg style={styles.background} />
      <View style={styles.container}>
        <HeaderBar title="안녕하세요! 환영해요." />

        {/* 로고 */}
        <View style={styles.logoContainer}>
          <HeartWhale width={50} height={50} />
          <Text style={styles.appName}>WithU</Text>
        </View>

        <View style={styles.loginContainer}>
          {/* 카카오 로그인 버튼 */}
          <TouchableOpacity style={styles.kakaoButton} onPress={() => initKakao()}>
            <KakaoLogin width={300} height={70} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 230,
  },
  appName: {
    marginTop: 3,
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
  },
  loginContainer: {
    position: "absolute",
    bottom: 122,
    justifyContent: "center",
    alignItems: "center",
  },
  kakaoButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  loginHintContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginHintText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.white,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.yellow,
  },
});
