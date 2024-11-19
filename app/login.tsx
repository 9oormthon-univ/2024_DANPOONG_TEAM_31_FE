import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import HeartWhale from "@/assets/images/icons/heart_whale.svg";
import KakaoLogin from "@/assets/images/icons/kakao_login.svg";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 로고 */}
      <View style={styles.logoContainer}>
        <HeartWhale width={50} height={50} />
        <Text style={styles.appName}>WithU</Text>
      </View>

      <View style={styles.loginContainer}>
        {/* 카카오 로그인 버튼 */}
        <TouchableOpacity style={styles.kakaoButton}>
          <KakaoLogin width={300} height={70} />
        </TouchableOpacity>

        {/* 로그인 안내 */}
        <View style={styles.loginHintContainer}>
          <Text style={styles.loginHintText}>계정이 있으신가요? </Text>
          <TouchableOpacity>
            <Text style={styles.loginLink}>로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  logoContainer: {
    alignItems: "center",
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
    alignItems: "center"
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
