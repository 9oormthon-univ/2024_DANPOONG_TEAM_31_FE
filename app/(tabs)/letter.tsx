import React from "react";
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

  return (
    <View style={styles.container}>
      {users.map((user) => (
        <TouchableOpacity
          key={user.id}
          style={styles.profileContainer}
          onPress={() => router.push(`/letter/select`)}
        >
          <View key={user.id} style={styles.profileContainer}>
            {user.image ? (
              <Image source={{ uri: user.image }} style={styles.profileImage} />
            ) : (
              <EmptyProfil width={100} height={100} />
            )}
            <Text style={styles.userName}>{user.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <RightArrow style={styles.rightArrow} width={6} height={12} />
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
  rightArrow: {
    position: "absolute",
    right: 30,
    top: "30%", // 화면의 세로 중심 되도록 이것도 바꾸기
    transform: [{ translateY: -6 }],
  },
});