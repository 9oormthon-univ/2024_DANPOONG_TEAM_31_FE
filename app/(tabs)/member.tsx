import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "@/constants/colors";

export default function Member() {
  // 임의 데이터
  const myInfo = { name: "강민서", email: "rkdalstj@hanmail.net" };
  const familyMembers = [
    { id: 1, name: "가족1", email: "rkwhr1@gmail.com" },
    { id: 2, name: "가족2", email: "rkwhr2@gmail.com" },
    { id: 3, name: "가족3", email: "rkwhr3@gmail.com" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>멤버 리스트</Text>
      {/* 내 정보 */}
      <View style={styles.memberItem}>
        <View style={styles.profileCircle} />
        <Text style={styles.name}>{myInfo.name}</Text>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.email}>{myInfo.email}</Text>
      </View>
      {/* 얇은 선 */}
      <View style={styles.divider} />
      {/* 가족 정보 */}
      {familyMembers.map((member) => (
        <View key={member.id} style={styles.memberItem}>
          <View style={styles.profileCircle} />
          <Text style={styles.name}>{member.name}</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.email}>{member.email}</Text>
        </View>
      ))}

      {/* 초대장 보내기 버튼 */}
      <TouchableOpacity style={styles.inviteButton}>
        <Text style={styles.inviteButtonText}>초대장 보내기</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  title: {
    fontWeight: '400',
    fontSize: 20,
    color: colors.white,
    marginTop: 16,
    marginLeft: 40.5,
    marginBottom: 33,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 40.5,
  },
  profileCircle: {
    width: 45,
    height: 45,
    borderRadius: "50%",
    backgroundColor: colors.blue_lightgray_FF,
    marginRight: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginRight: 8,
  },
  separator: {
    fontSize: 14,
    color: "#C2BCDC",
    marginRight: 8,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.white,
  },
  divider: {
    height: 1,
    width: 353,
    backgroundColor: colors.grayA78,
    alignSelf: "center",
    marginBottom: 20,
  },
  inviteButton: {
    backgroundColor: colors.white,
    borderRadius: 25,
    height: 48,
    width: 353,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 109,
  },
  inviteButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.blue_gray_46,
  },
});
