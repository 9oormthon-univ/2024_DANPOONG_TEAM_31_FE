import HeaderBar from "@/components/header_bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import LeftArrow from "@/assets/images/icons/left_arrow.svg";
import RightArrow from "@/assets/images/icons/right_arrow.svg";
import HeartWhaleWithShadow from "@/assets/images/icons/heart_whale_w_shadow.svg";

export default function Account() {
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.container}>
      <HeaderBar title="마이페이지" />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <LeftArrow />
        </Pressable>
        <Text style={styles.title}>내 계정</Text>
        <View style={{ width: 8 }}></View>
      </View>
      <View style={styles.content}>
        <Row name="닉네임 변경" value="민서" action={() => {}} />
        <Row name="생년월일 변경" value="2003년 10월 23일" action={() => {}} />
        <Pressable>
          <Row name="로그아웃" />
        </Pressable>
        <Pressable>
          <Row name="계정 탈퇴" />
        </Pressable>
      </View>
      <View
        style={{
          position: "absolute",
          left: "50%",
          bottom: tabBarHeight + 20.08,
          transform: "translate(-50%,0)",
        }}
      >
        <HeartWhaleWithShadow />
      </View>
    </View>
  );
}

const Row = ({ name, value, action }: { name: string; value?: string; action?: () => void }) => {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.rowName}>{name}</Text>
      <View style={styles.valueWrapper}>
        <Text style={styles.rowValue}>{value}</Text>
        {action && (
          <Pressable onPress={() => action()}>
            <RightArrow />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  header: {
    marginTop: 31,
    marginHorizontal: 20.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 20,
  },
  content: {
    marginTop: 22,
    paddingHorizontal: 20.5,
    gap: 10,
  },
  rowContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 30,
    backgroundColor: colors.blue_gray_55,
  },
  rowName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  valueWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowValue: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "400",
  },
});
