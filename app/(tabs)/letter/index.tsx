import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import EmptyProfil from "@/assets/images/icons/empty_profil.svg";
import RightArrow from "@/assets/images/icons/right_arrow.svg";
import HeaderBar from "@/components/header_bar";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/modules/api";
import { LetterContext } from "@/contexts/LetterContext";

interface FamilyMembersData {
  familyId: number;
  members: {
    userId: number;
    nickname: string;
    email: string;
    image?: string;
  }[];
}

export default function Letter() {
  const router = useRouter();

  const { data: familyMembers } = useQuery<FamilyMembersData>({
    queryFn: () => api.get("/family/members").then((res) => res.data),
    queryKey: ["/family/members"],
  });

  const [letter, setLetter] = useContext(LetterContext);

  // 사용자 선택 처리 함수
  const handleUserSelect = (id: number) => {
    setLetter?.({ receiverId: id });
  };

  // 페이지 이동 처리 함수
  const handleNavigate = () => {
    if (letter?.receiverId) {
      router.push(`/letter/select`);
    } else {
      alert("프로필을 선택해 주세요."); // 프로필이 선택되지 않았을 때 경고 표시
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="누구에게 메세지를 보낼까요?" />
      <View style={styles.profilesContainer}>
        {familyMembers?.members?.map((member) => (
          <TouchableOpacity
            key={member?.userId}
            style={[
              styles.profileContainer,
              letter?.receiverId === member?.userId && styles.selectedProfile,
            ]}
            onPress={() => handleUserSelect(member?.userId)}
          >
            <View style={styles.shadowContainer}>
              {member?.image ? (
                <Image source={{ uri: member?.image }} style={styles.profileImage} />
              ) : (
                <EmptyProfil width={100} height={100} />
              )}
            </View>
            <Text style={styles.userName}>{member?.nickname}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={handleNavigate} style={styles.arrowContainer}>
        <RightArrow style={styles.rightArrow} width={6} height={12} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  profilesContainer: {
    flexDirection: "row", // 가로 방향으로 정렬
    flexWrap: "wrap", // 줄 바꿈
    justifyContent: "center", // 중앙 정렬
    marginTop: 143,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 46,
    width: "40%", // 2개씩 나열되도록 너비 조정
  },
  selectedProfile: {
    // 선택된 상태에서 그림자를 추가
    shadowColor: "#FFFFFF", // 흰색 그림자
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10, // Android를 위한 그림자
  },
  shadowContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    marginTop: 19,
    fontSize: 12,
    color: colors.white,
    fontWeight: 700,
    textAlign: "center",
  },
  arrowContainer: {
    position: "absolute",
    right: 30,
    top: "45%",
    transform: [{ translateY: -6 }],
    padding: 10,
  },
  rightArrow: {},
});
