import React, { useState } from "react";
import HeaderBar from "@/components/header_bar";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import LeftArrow from "@/assets/images/icons/left_arrow.svg";
import RightArrow from "@/assets/images/icons/right_arrow.svg";
import HeartWhaleWithShadow from "@/assets/images/icons/heart_whale_w_shadow.svg";

export default function Account() {
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();

  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState<"nickname" | "birthdate" | null>(null);
  const [nickname, setNickname] = useState("민서");
  const [birthdate, setBirthdate] = useState("2003년 10월 23일");
  const [inputValue, setInputValue] = useState("");

  const handleOpenModal = (field: "nickname" | "birthdate") => {
    setCurrentField(field);
    setInputValue(field === "nickname" ? nickname : birthdate);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (currentField === "nickname") setNickname(inputValue);
    if (currentField === "birthdate") setBirthdate(inputValue);
    setModalVisible(false);
  };

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
        <Row name="닉네임 변경" value={nickname} action={() => handleOpenModal("nickname")} />
        <Row name="생년월일 변경" value={birthdate} action={() => handleOpenModal("birthdate")} />
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
          alignSelf: "center",
          bottom: 116.08,
        }}
      >
        <HeartWhaleWithShadow />
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {currentField === "nickname" ? "닉네임 변경" : "생년월일 변경"}
            </Text>
            <TextInput
              style={styles.modalInput}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder={
                currentField === "nickname" ? "새 닉네임 입력" : "새 생년월일 입력"
              }
            />
            <View style={styles.modalActions}>
              <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>취소</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={handleSave}>
                <Text style={styles.modalButtonText}>저장</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.blue_gray_55,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: colors.blue_gray_55,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
