import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import HeaderBar from "@/components/header_bar";
import colors from "@/constants/colors";
import { BlurView } from "expo-blur";
import { randomPosition } from "@/modules/randomPosition";
import { useMemoStore } from "@/stores/memoStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BouncingComponent from "@/components/BouncingComponent";
import { useMemo } from "react";

// import Cloud from "@/assets/images/icons/cloud.svg";
import Cloud from "@/assets/images/icons/small_cloud.svg";
// import SpeechBubble from "@/assets/images/icons/speech_bubble_default.svg";
import Triangle from "@/assets/images/icons/triangle.svg";
import Heart from "@/assets/images/icons/small_fill_heart.svg";
import DarkBlueBubble from "@/assets/images/icons/darkblue_speech_bubble.svg";
import CloudLetter from "@/assets/images/icons/Cloud_letters_big.svg";
import Whale from "@/assets/images/icons/mainWhale.svg";
import SpeechBubbleWithMail from "@/assets/images/icons/speech_bubble_w_mail.svg";
import X from "@/assets/images/icons/x_light.svg";
import AudioMessage from "@/components/audio_message";
import ImgTextMessage from "@/components/imgtext_message";
import TextMessage from "@/components/text_message";
import { SelectMemoType } from "@/components/newMemo/SelectMemoType";
import { EnterMemo } from "@/components/newMemo/EnterMemo";

export default function Home() {
  const { type, setType } = useMemoStore();
  const insets = useSafeAreaInsets();

  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 상태 관리

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const [selectedCloud, setSelectedCloud] = useState<number | null>(null); // 선택된 구름 ID 관리

  // TODO add deps
  const CloudLetters = useMemo(() => {
    return [1, 2, 3].map((value) => (
      <TouchableOpacity
        key={value}
        style={{ position: "absolute", ...randomPosition() }}
        onPress={openModal}
      >
        <BouncingComponent timingIndex={value}>
          <CloudLetter />
        </BouncingComponent>
      </TouchableOpacity>
    ));
  }, []);

  // 각 구름의 상태를 객체로 저장
  const bubbles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    width: useRef(new Animated.Value(28)).current, // 초기 너비
    height: useRef(new Animated.Value(19)).current, // 초기 높이
    position: useRef(new Animated.ValueXY({ x: 0, y: 0 })).current, // 초기 위치
    opacity: useRef(new Animated.Value(1)).current, // DarkBlueBubble 투명도
  }));

  const handleCloudPress = (id: number) => {
    const isSelected = selectedCloud === id; // 현재 선택된 구름인지 확인
    setSelectedCloud(isSelected ? null : id); // 같은 구름을 누르면 해제

    Animated.parallel([
      // 크기 애니메이션
      Animated.timing(bubbles[id].width, {
        toValue: isSelected ? 28 : 51, // 원래 크기로 돌아가기 or 커지기
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(bubbles[id].height, {
        toValue: isSelected ? 19 : 35,
        duration: 300,
        useNativeDriver: false,
      }),
      // 위치 애니메이션
      Animated.timing(bubbles[id].position.x, {
        toValue: isSelected ? 0 : -24, // X축 이동값
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(bubbles[id].position.y, {
        toValue: isSelected ? 0 : -15, // Y축 이동값
        duration: 300,
        useNativeDriver: false,
      }),
      // DarkBlueBubble 투명도 애니메이션
      Animated.timing(bubbles[id].opacity, {
        toValue: isSelected ? 1 : 0, // 원래 상태로 돌아가기 or 사라지기
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="민정님, 안녕하세요" />
      <View style={styles.schrollviewContainer}>
        <ScrollView
          style={styles.cloudsScrollView}
          contentContainerStyle={styles.cloudsScrollViewContent}
          horizontal // 가로 스크롤 활성화
          showsHorizontalScrollIndicator={false} // 스크롤바 숨기기
        >
          {bubbles.map((bubble) => (
            <TouchableOpacity
              key={bubble.id}
              style={styles.cloud}
              onPress={() => handleCloudPress(bubble.id)} // 클릭 이벤트 처리
            >
              <View style={styles.cloudContainer}>
                <Cloud width={51} height={31} style={styles.cloudImg} />
                <View style={styles.speechBubbleContainer}>
                  {/* Speech Bubble 크기 애니메이션 */}
                  <Animated.View
                    style={[
                      styles.speechBubble,
                      {
                        width: bubble.width,
                        height: bubble.height,
                        transform: [
                          { translateX: bubble.position.x },
                          { translateY: bubble.position.y },
                        ],
                      },
                    ]}
                  />
                  <Triangle width={6} height={8} style={styles.triangle} />
                  <Animated.View style={{ opacity: bubble.opacity }}>
                    <DarkBlueBubble width={12} height={12} style={styles.speechBubbleImg} />
                  </Animated.View>
                  <Animated.Text
                    style={[
                      styles.speechBubbleText,
                      {
                        opacity: bubble.opacity.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 0], // DarkBlueBubble이 사라지면 텍스트가 나타남
                        }),
                      },
                    ]}
                  >
                    내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
                  </Animated.Text>
                </View>
              </View>
              <Text style={styles.cloudName}>이름이</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.cloudsBoundary}>{CloudLetters}</View>
      <View style={{ position: "absolute", bottom: insets.bottom + 34 + 115.93, left: 155 }}>
        <SpeechBubbleWithMail style={{ position: "absolute", top: -44, right: -11 }} />
        <Whale />
      </View>
      <Modal animationType="fade" transparent={true} visible={type !== undefined}>
        <BlurView style={StyleSheet.absoluteFill} intensity={15} tint="light" />
        <View style={[styles.modal, { marginBottom: insets.bottom }]}>
          {type === "unselected" && <SelectMemoType />}
          {(type === "mood" || type === "message") && <EnterMemo />}
          <Pressable
            style={{
              width: 52,
              height: 52,
              flexShrink: 0,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.blue_gray_46,
              borderRadius: 999,
            }}
            onPress={() => {
              setType(undefined);
            }}
          >
            <X />
          </Pressable>
        </View>
      </Modal>
      {/* <AudioMessage visible={isModalVisible} onClose={closeModal} /> AudioMessage 모달 */}
      {/* <ImgTextMessage visible={isModalVisible} onClose={closeModal} /> ImgTextMessage 모달 */}
      <TextMessage visible={isModalVisible} onClose={closeModal} /> {/* TextMessage 모달 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  schrollviewContainer: {
    height: "13%",
  },
  cloudsScrollView: {
    width: "88%",
    marginHorizontal: 20,
    // borderWidth: 2, // 디버깅용
    // borderColor: "red", // 디버깅용
    // backgroundColor: "rgba(255, 0, 0, 0.1)", // 디버깅용
  },
  cloudsScrollViewContent: {
    flexDirection: "row", // 가로 정렬
    marginTop: 23,
  },
  cloud: {
    width: 51,
    height: 74,
    marginRight: 7,
  },
  cloudImg: {
    marginTop: 27,
  },
  cloudContainer: {
    position: "relative",
    alignSelf: "center",
  },
  speechBubbleContainer: {
    position: "absolute",
    right: 28,
    top: 0,
  },
  speechBubble: {
    position: "absolute",
    backgroundColor: colors.white,
    width: 28,
    height: 19,
    borderRadius: 10,
  },
  triangle: {
    position: "absolute",
    left: 3.39,
    top: 15,
  },
  speechBubbleImg: {
    position: "absolute",
    left: 8,
    top: 4,
  },
  speechBubbleText: {
    position: "absolute",
    width: 45,
    height: 25,
    fontWeight: "500",
    color: colors.black,
    textAlign: "center",
    fontSize: 6,
    top: -10,
    left: -21,
  },
  cloudName: {
    alignSelf: "center",
    color: colors.white,
    fontSize: 10,
    fontWeight: "500",
    marginTop: 2,
  },
  separator: {
    marginTop: 11,
    marginHorizontal: 20,
    height: 1,
    backgroundColor: colors.grayA78,
  },
  cloudsBoundary: {
    flex: 1,
    position: "relative",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
