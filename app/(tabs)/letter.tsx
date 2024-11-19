import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import EmptyProfil from "@/assets/images/icons/empty_profil.svg";
import RightArrow from "@/assets/images/icons/right_arrow.svg";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";

export default function Letter() {
  const router = useRouter();
  // 임시 데이터 배열
  const users = [
    { id: 1, name: "강민서", image: null },
    { id: 2, name: "김현서", image: null },
    { id: 3, name: "허윤호", image: null },
    { id: 4, name: "조민정", image: null },
  ];

  // 선택된 사용자 상태 관리
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  // 사용자 선택 처리 함수
  const handleUserSelect = (id: number) => {
    setSelectedUser(id);
  };

  // 페이지 이동 처리 함수
  const handleNavigate = () => {
    if (selectedUser) {
      router.push(`/letter/select`);
    } else {
      alert("프로필을 선택해 주세요."); // 프로필이 선택되지 않았을 때 경고 표시
    }
  };

  return (
    <View style={styles.container}>
      {users.map((user) => (
        <TouchableOpacity
          key={user.id}
          style={[
            styles.profileContainer,
            selectedUser === user.id && styles.selectedProfile,
          ]}
          onPress={() => handleUserSelect(user.id)}
        >
          <View style={styles.shadowContainer}>
            {user.image ? (
              <Image source={{ uri: user.image }} style={styles.profileImage} />
            ) : (
              <EmptyProfil width={100} height={100} />
            )}
          </View>
          <Text style={styles.userName}>{user.name}</Text>
        </TouchableOpacity>
      ))}
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
    justifyContent: "center", // 수평 중앙 정렬
    alignItems: "center", // 수직 중앙 정렬
    paddingHorizontal: 25,
    marginTop: 170, // 나중에 위치 바꾸기
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 46,
    width: "45%",
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
    top: "30%", // 화면의 세로 중심 되도록 이것도 바꾸기
    transform: [{ translateY: -6 }],
    padding: 10,
  },
  rightArrow: {
    
  },
});