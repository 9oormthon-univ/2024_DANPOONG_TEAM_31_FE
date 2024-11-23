import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Clipboard } from "react-native";
import HeaderBar from "@/components/header_bar";
import colors from "@/constants/colors";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/modules/api";
import { useAuthStore } from "@/stores/authStore";

// 가족 멤버 타입 정의
interface FamilyMember {
  userId: number;
  nickname: string;
  email: string;
}

export default function Member() {
  const accessToken = useAuthStore((state) => state.accessToken);
  // 유저 정보
  const { data: myInfo } = useQuery({
    queryFn: () => api.get("/users/myInfo").then((res) => res.data),
    queryKey: ["users/myInfo"],
  });

  // 가족 멤버 정보
  const { data: familyMembers } = useQuery({
    queryFn: () =>
      Promise.resolve({
        members: [
          {
            userId: 2,
            nickname: "서현은",
            email: "hyuneunseo@gmail.com",
          },
          {
            userId: 3,
            nickname: "허윤호",
            email: "yoonho0518@kakao.com",
          },
        ],
      }),
    queryKey: ["family/members"],
  });
  

  const sendInvite = async () => {
    try {
      const response = await fetch("http://15.164.29.113:8080/api/family/invite", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`초대장 생성 실패: ${response.status}`);
      }

      const inviteLink = await response.text(); // API 응답으로 받은 초대 링크
      console.log("Invite Link:", inviteLink);

      // 클립보드에 복사
      Clipboard.setString(inviteLink);

      // 성공 알림
      Alert.alert("초대장 생성 완료", "초대 링크가 클립보드에 복사되었습니다.");
    } catch (error) {
      console.error("초대장 생성 에러:", error);
      Alert.alert("초대장 생성 실패", "다시 시도해주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="가족을 초대해주세요!" />
      <Text style={styles.title}>멤버 리스트</Text>
      {/* 내 정보 */}
      <View style={styles.memberItem}>
        <View style={styles.profileCircle} />
        <Text style={styles.name}>{myInfo?.nickname}</Text>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.email}>{myInfo?.email}</Text>
      </View>
      {/* 얇은 선 */}
      <View style={styles.divider} />
      {/* 가족 정보 */}
      {familyMembers?.members
        ?.filter((member: FamilyMember) => member.userId !== myInfo?.userId) // 본인 제외
        .map((member: FamilyMember) => (
          <View key={member.userId} style={styles.memberItem}>
            <View style={styles.profileCircle} />
            <Text style={styles.name}>{member.nickname}</Text>
            <Text style={styles.separator}>|</Text>
            <Text style={styles.email}>{member.email}</Text>
          </View>
        ))}

      {/* 초대장 보내기 버튼 */}
      <TouchableOpacity style={styles.inviteButton} onPress={sendInvite}>
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
    borderRadius: 25,
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
