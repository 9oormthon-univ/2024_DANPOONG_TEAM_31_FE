import HeaderBar from "@/components/header_bar";
import colors from "@/constants/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import RightArrow from "@/assets/images/icons/right_arrow.svg";
import Stars from "@/assets/images/icons/stars.svg";
import BlackMail from "@/assets/images/icons/black_mail.svg";
import HeartWhaleWithShadow from "@/assets/images/icons/heart_whale_w_shadow.svg";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/modules/api";

export default function My() {
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();

  // 유저 정보
  const { data: myInfo } = useQuery({
    queryFn: () => api.get("/users/myInfo").then((res) => res.data),
    queryKey: ["users/myInfo"],
  });

  // 함께 한 지 N일
  const { data: daysTogether } = useQuery({
    queryFn: () => api.get("/mypage/days-together").then((res) => res.data),
    queryKey: ["/mypage/days-together"],
  });

  // 받은 편지
  const { data: received } = useQuery({
    queryFn: () => api.get("/mypage/letters/received").then((res) => res.data),
    queryKey: ["/mypage/letters/received"],
  });

  // 보낸 편지
  const { data: sent } = useQuery({
    queryFn: () => api.get("/mypage/letters/sent").then((res) => res.data),
    queryKey: ["/mypage/letters/sent"],
  });

  return (
    <View style={styles.container}>
      <HeaderBar title="마이페이지" />
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.username}>{myInfo?.nickname}님</Text>
          <Pressable onPress={() => router.push("/my/account")}>
            <RightArrow />
          </Pressable>
        </View>
        <View style={styles.message}>
          <View style={styles.daysSinceWrapper}>
            <Text style={styles.daysSince}>
              함께한 지 <Text style={styles.days}>{daysTogether}</Text>일
            </Text>
            <Stars />
          </View>
          <Text style={styles.thankyou}>WithU와 함께해주셔서 감사해요.</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.infoWrapper}>
            <View style={styles.chip}>
              <BlackMail />
              <Text style={styles.amountText}>{received}개</Text>
            </View>
            <Text style={styles.label}>받은 편지</Text>
          </View>
          <View style={styles.verticalSeparator}></View>
          <View style={styles.infoWrapper}>
            <View style={styles.chip}>
              <BlackMail />
              <Text style={styles.amountText}>{sent}개</Text>
            </View>
            <Text style={styles.label}>보낸 편지</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          bottom: 116.08,
        }}
      >
        <HeartWhaleWithShadow />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  card: {
    marginTop: 28,
    marginHorizontal: 20,
    paddingTop: 21,
    paddingLeft: 25,
    paddingRight: 20,
    paddingBottom: 33,
    backgroundColor: colors.blue_gray_55,
    borderRadius: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  username: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 20,
  },
  message: {
    marginTop: 22,
    alignItems: "flex-start",
    gap: 8,
  },
  daysSinceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  daysSince: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
  },
  days: {
    fontSize: 20,
  },
  thankyou: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20,
  },
  info: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  infoWrapper: {
    alignItems: "center",
    gap: 14,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 13.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.white,
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  amountText: {
    color: colors.blue_gray_55,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
  },
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20,
  },
  verticalSeparator: {
    height: "100%",
    borderWidth: 1,
    borderColor: colors.grayA78,
  },
});
