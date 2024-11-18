import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MoonIcon from "../assets/images/icons/moon.svg";
import BellIcon from "../assets/images/icons/bell.svg";
import SettingsIcon from "../assets/images/icons/settings.svg";
import colors from "@/constants/colors";

interface HeaderBarProps {
  title: string; // 부모로부터 전달받는 문구
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.icons}>
        {/* Moon Icon */}
        <TouchableOpacity style={styles.icon}>
            <MoonIcon width={24} height={24} />
        </TouchableOpacity>
        {/* Bell Icon */}
        <TouchableOpacity style={styles.icon}>
            <BellIcon width={24} height={24} />
        </TouchableOpacity>
        {/* Settings Icon */}
        <TouchableOpacity style={styles.icon}>
            <SettingsIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.grayA38_50, // 배경색
    borderRadius: 20, // 둥근 모서리
    width: 393,
    height: 48,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 16,
  },
});

export default HeaderBar;
