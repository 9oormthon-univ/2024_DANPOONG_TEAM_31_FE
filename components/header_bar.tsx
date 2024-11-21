import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MoonIcon from "../assets/images/icons/moon.svg";
import BellIcon from "../assets/images/icons/letterbox.svg";
import SettingsIcon from "../assets/images/icons/settings.svg";
import colors from "@/constants/colors";
import { useRouter, usePathname } from "expo-router";

interface HeaderBarProps {
  title: string; // 부모로부터 전달받는 문구
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
  const router = useRouter();
  const pathname = usePathname();

  // 각 아이콘의 클릭 상태 관리
  const [isMoonActive, setIsMoonActive] = useState(false);
  const [isBellActive, setIsBellActive] = useState(false);
  const [isSettingsActive, setIsSettingsActive] = useState(false);

  useEffect(() => {
    // 현재 페이지가 설정 페이지라면 isSettingsActive를 true로 설정
    setIsSettingsActive(pathname === "/home/settings");
    setIsBellActive(pathname.startsWith("/letterbox"));
  }, [pathname]);

  const handleSettingsPress = () => {
    // 현재 경로가 설정 페이지라면 이전 페이지로 돌아감
    if (pathname === "/home/settings") {
      router.back();
    } else {
      // 설정 페이지로 이동
      router.push("/home/settings");
    }
  };

  const handleBellPress = () => {
    if (pathname.startsWith("/letterbox")) {
      router.back(); // 이전 페이지로 돌아가기
    } else {
      router.push("/letterbox/letterbox_calendar"); // letterbox 캘린더 페이지로 이동
    }
  };

  // 아이콘 스타일 동적 설정
  const getIconStyle = (isActive: boolean) => {
    return isActive
      ? {
          shadowColor: colors.white, // 흰색 그림자
          shadowOffset: { width: 0, height: 0 }, // 그림자 위치
          shadowOpacity: 1, // 그림자 투명도
          shadowRadius: 2, // 그림자 블러 크기
          elevation: 5, // Android 그림자
        }
      : {};
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logoTitle}>WithU</Text>
      <View style={styles.topBar}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.icons}>
          {/* Moon Icon */}
          <TouchableOpacity style={[styles.icon, getIconStyle(isMoonActive)]}
            onPress={() => setIsMoonActive((prev) => !prev)}>
              <MoonIcon width={24} height={24} />
          </TouchableOpacity>
          {/* Bell Icon */}
          <TouchableOpacity
            style={[styles.icon, getIconStyle(isBellActive)]}
            onPress={handleBellPress}
          >
            <BellIcon width={24} height={24} />
          </TouchableOpacity>
          {/* Settings Icon */}
          <TouchableOpacity
            style={[styles.icon, getIconStyle(isSettingsActive)]}
            onPress={handleSettingsPress}
          >
            <SettingsIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logoTitle: {
    fontWeight: '200',
    fontSize: 20,
    color: colors.white,
    marginBottom: 15,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.grayA38_50,
    borderRadius: 20,
    width: 353,
    height: 48,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 20,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  icon: {
    marginLeft: 10,
  },
});

export default HeaderBar;
