import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import colors from "@/constants/colors";
import { BlurView } from 'expo-blur';

import Heart from "@/assets/images/icons/letter_heart.svg";
import EmptyHeart from "@/assets/images/icons/empty_heart.svg";
import FillHeart from "@/assets/images/icons/fill_heart.svg";
import PlayBtn from "@/assets/images/icons/play_btn.svg";
import XBtn from "@/assets/images/icons/x_light.svg";
import XBtnBack from "@/assets/images/icons/modal_x_back.svg";
import LetterBg from "@/assets/images/icons/letter_bg.svg";

interface AudioMessageProps {
    visible: boolean; // 모달 표시 여부
    onClose: () => void; // 모달 닫기 함수
}

export default function AudioMessage({ visible, onClose }: AudioMessageProps) {
    const [liked, setLiked] = useState(false); // 좋아요 상태 관리

  const toggleLike = () => {
    setLiked((prev) => !prev); // 상태를 반전
  };

  return (
    <View style={styles.container}>
      {/* Modal */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        {/* Background Blur */}
        <BlurView
          style={styles.modalOverlay}
          intensity={10} // 블러 강도 설정
          tint="dark" // 'light', 'dark', 'default' 중 선택
        >
            {/* 모달 닫기 */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <XBtnBack width={97} height={62} style={styles.closeButtonBack}/>
                <XBtn width={24} height={24} style={styles.closeButtonIcon}/>
            </TouchableOpacity>

            {/* 모달 내용 */}
            <View style={styles.modalContentWrapper}>
                <LetterBg style={styles.modalBackground} /> {/* SVG 배경 */}
                <View style={styles.modalContent}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Heart width={49.14} height={44.72} style={styles.topIcon} />
                        <Text style={styles.scheduleName}>일정이름</Text>
                        <View style={styles.devide}></View>
                    </View>

                    {/* 메세지 본문 */}
                    <View style={styles.body}>
                        <Text style={styles.toText}>To. 거북이</Text>
                        <TouchableOpacity onPress={toggleLike} style={styles.likeIcon}>
                        {liked ? (
                            <FillHeart width={20} height={20} />
                        ) : (
                            <EmptyHeart width={20} height={20} />
                        )}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.playButtonWrapper}>
                        <PlayBtn width={103} height={103} />
                        </TouchableOpacity>
                        <Text style={styles.fromText}>From. 토끼</Text>
                    </View>

                    {/* 하단 보관하기 버튼 */}
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
    closeButtonBack: {
    },
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
    },
    scheduleName:{
        position: "absolute",
        fontSize: 16,
        fontWeight: '700',
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
    playButtonWrapper: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 13.39,
    },
    fromText: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.white,
        marginTop: 30.98,
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