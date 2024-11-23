import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import HeartWhale from "@/assets/images/icons/heart_whale.svg";
import KakaoLogin from "@/assets/images/icons/kakao_login.svg";
import Ellipse from "@/assets/images/icons/Ellipse.svg";
import BackgroundImg from "@/assets/images/background.svg";
import HeaderBar from "@/components/header_bar";
import { useNavigation, useRouter } from "expo-router";
import colors from "@/constants/colors";
import { login } from "@react-native-kakao/user";
import { SettingsPage } from "@/components/SettingsPage";
import { useAppStore } from "@/stores/appStore";
import { api } from "@/modules/api";
import { useAuthStore } from "@/stores/authStore";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import { useUserStore } from "@/stores/userStore";

export default function Login() {
  const router = useRouter();

  const { setAccessToken, setRefreshToken } = useAuthStore();
  const { updateUser } = useUserStore();

  useEffect(() => {
    initializeKakaoSDK("d6f138e3695774e7f06cfb1c569b29c9");
  }, []);

  const initKakao = async () => {
    console.log("logging in");

    login()
      .then(async (result) => {
        console.log(result);

        const { accessToken, refreshToken, familyId } = await api
          .post("/auth/kakao/login", undefined, {
            headers: {
              Authorization: `Bearer ${result.accessToken}`,
            },
          })
          .then((res) => res.data);

        console.log(familyId);

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        updateUser({ familyId });

        router.replace("/home");
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });
  };

  const { showSettingsOnLogin } = useAppStore();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 배경 이미지 */}
      <BackgroundImg style={styles.background} />
      {showSettingsOnLogin ? (
        <SettingsPage />
      ) : (
        <View style={styles.container}>
          <HeaderBar title="안녕하세요! 환영해요." />

          {/* 로고 */}
          <View style={styles.logoContainer}>
            <Ellipse width={75.09} height={32.29} style={styles.elllips} />
            <HeartWhale width={52.03} height={54.15} style={styles.heartWhale} />
            <Text style={styles.appName}>WithU</Text>
          </View>

          <View style={styles.loginHintContainer}>
            <Text style={styles.loginHintText}>
              힘든 세상을 살아가고 있는 나의 소중한 사람들에게{"\n"}따듯한 말 한마디를 전해보는건
              어떨까요?
            </Text>
          </View>

          <View style={styles.loginContainer}>
            {/* 카카오 로그인 버튼 */}
            <TouchableOpacity style={styles.kakaoButton} onPress={() => initKakao()}>
              <KakaoLogin width={300} height={70} />
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    marginTop: 169,
  },
  elllips: {
    position: "absolute",
    top: 30,
  },
  heartWhale: {
    shadowColor: colors.white, // 흰색 그림자
    shadowOffset: { width: 0, height: 3 }, // 그림자 위치
    shadowOpacity: 0.4, // 그림자 투명도
    shadowRadius: 2, // 그림자 블러 크기
    elevation: 5, // Android 그림자
  },
  appName: {
    marginTop: 5.53,
    fontSize: 35.88,
    fontWeight: "700",
    color: colors.white,
  },
  loginContainer: {
    position: "absolute",
    bottom: 127,
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
    marginTop: 42.09,
  },
  loginHintText: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.white,
    textAlign: "center",
  },
});
