import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import colors from "@/constants/colors";
import { BlurView } from "expo-blur";
import { useFontStore } from "@/stores/fontStore";

import EmptyHeart from "@/assets/images/icons/empty_heart.svg";
import FillHeart from "@/assets/images/icons/fill_heart.svg";
import XBtn from "@/assets/images/icons/x_light.svg";
import XBtnBack from "@/assets/images/icons/modal_x_back.svg";
import LetterBg from "@/assets/images/icons/letter_bg.svg";

interface TextMessageProps {
  visible: boolean; // 모달 표시 여부
  onClose: () => void; // 모달 닫기 함수
}

export default function ImgTextMessage({ visible, onClose }: TextMessageProps) {
  const [liked, setLiked] = useState(false); // 좋아요 상태 관리
  const { selectedFont } = useFontStore(); // Zustand에서 선택된 폰트 가져오기

  const toggleLike = () => {
    setLiked((prev) => !prev); // 상태를 반전
  };

  return (
    <View style={styles.container}>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
        <BlurView style={styles.modalOverlay} intensity={10} tint="light">
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <XBtnBack width={97} height={62} style={styles.closeButtonBack} />
            <XBtn width={24} height={24} style={styles.closeButtonIcon} />
          </TouchableOpacity>

          <View style={styles.modalContentWrapper}>
            <LetterBg style={styles.modalBackground} />
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <Text style={styles.scheduleName}>일정이름</Text>
                <View style={styles.devide}></View>
              </View>

              <View style={styles.body}>
                <Text style={styles.toText}>To. 거북이</Text>
                <TouchableOpacity onPress={toggleLike} style={styles.likeIcon}>
                  {liked ? (
                    <FillHeart width={20} height={20} />
                  ) : (
                    <EmptyHeart width={20} height={20} />
                  )}
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <Text style={[styles.textMessage, { fontFamily: selectedFont }]}>
                    내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
                  </Text>
                </View>
                <Text style={styles.fromText}>From. 토끼</Text>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>보관하기</Text>
              </View>
            </View>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 113,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  closeButtonBack: {},
  closeButtonIcon: {
    position: "absolute",
    top: 19,
    left: 47,
    shadowColor: colors.white, // 흰색 그림자
    shadowOffset: { width: 0, height: 0 }, // 그림자 위치
    shadowOpacity: 1, // 그림자 투명도
    shadowRadius: 2, // 그림자 블러 크기
    elevation: 5, // Android 그림자
  },
  modalContentWrapper: {
    marginTop: 182.5,
    position: "relative",
    alignItems: "center",
  },
  modalBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    shadowColor: colors.white, // 흰색 그림자
    shadowOffset: { width: 0, height: 0 }, // 그림자 위치
    shadowOpacity: 0.4, // 그림자 투명도
    shadowRadius: 10, // 그림자 블러 크기
    elevation: 5, // Android 그림자
  },
  modalContent: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  header: {
    width: 335,
    height: 95,
    alignItems: "center",
  },
  topIcon: {
    position: "absolute",
    top: 7,
  },
  scheduleName: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
    top: 70,
  },
  devide: {
    height: 2,
    width: 315,
    backgroundColor: colors.grayA78,
    position: "absolute",
    top: 112,
    borderRadius: 2,
  },
  body: {
    width: 335,
  },
  toText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
    marginTop: 33,
    marginLeft: 21,
  },
  likeIcon: {
    position: "absolute",
    top: 33,
    right: 21,
  },
  textContainer: {
    marginTop: 9,
    flexDirection: "row",
    alignItems: "center",
    width: 230,
    height: 130,
    justifyContent: "center",
    alignSelf: "center",
  },
  textMessage: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.white,
    fontFamily: "EFDiary",
    lineHeight: 20,
    textAlign: "center",
  },
  fromText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
    marginTop: 10, // 비교 후 나중에 수정
    marginLeft: 233,
  },
  footer: {
    marginTop: 30.69,
    backgroundColor: colors.light_yellow,
    width: 96,
    height: 35,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.blue_gray_46,
  },
});
