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
import SpeechBubble from "@/assets/images/icons/speech_bubble_default.svg";
// import Triangle from "@/assets/images/icons/triangle.svg";
import Heart from "@/assets/images/icons/small_fill_heart.svg";
import DarkBlueBubble from "@/assets/images/icons/darkblue_speech_bubble.svg";
import CloudLetter from "@/assets/images/icons/Cloud_letters_big.svg";
import Whale from "@/assets/images/icons/mainWhale.svg";
import SpeechBubbleWithMail from "@/assets/images/icons/speech_bubble_w_mail.svg";
import X from "@/assets/images/icons/x_light.svg";
import Devide from "@/assets/images/icons/devide.svg";
import AudioMessage from "@/components/audio_message";
import ImgTextMessage from "@/components/imgtext_message";
import TextMessage from "@/components/text_message";
import { SelectMemoType } from "@/components/newMemo/SelectMemoType";
import { EnterMemo } from "@/components/newMemo/EnterMemo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/modules/api";

const bubblesData = [
  { emoji: "🙂", name: "행복", message: "행복핑", person: "김현서" },
  { emoji: "😗", name: "기쁨", message: "끼끼핑", person: "서현은" },
  { emoji: "🥲", name: "슬픔", message: "ㅠㅠㅜㅠ슬퍼", person: "허윤호" },
  { emoji: "😐", name: "긴장", message: "긴장하지 말고 자신있게!", person: "김현서" },
  { emoji: "😡", name: "화남", message: "왜저래", person: "서현은" },
  { emoji: "🥰", name: "감동", message: "사랑해", person: "허윤호" },
  { emoji: "🫨", name: "놀람", message: "헛헛", person: "김현서" },
];

export default function Home() {
  const { type, setType } = useMemoStore();
  const insets = useSafeAreaInsets();

  const queryClient = useQueryClient();

  // 유저 정보
  const { data: myInfo } = useQuery({
    queryFn: () => api.get("/users/myInfo").then((res) => res.data),
    queryKey: ["/users/myInfo"],
  });

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
  const bubbles = useRef(
    Array.from({ length: 8 }, () => ({
      opacitySpeech: new Animated.Value(1), // SpeechBubble 투명도
      opacityText: new Animated.Value(0), // textSpeechBubble 투명도
      translateYText: new Animated.Value(-10), // textSpeechBubble의 Y 위치 (고정)
    }))
  ).current;

  const handleCloudPress = (id: number) => {
    setSelectedCloud(id);

    Animated.sequence([
      // SpeechBubble 사라짐
      Animated.timing(bubbles[id].opacitySpeech, {
        toValue: 0, // SpeechBubble 사라짐
        duration: 300,
        useNativeDriver: true, // opacity는 네이티브에서 처리 가능
      }),
      // textSpeechBubble 나타남
      Animated.parallel([
        Animated.timing(bubbles[id].opacityText, {
          toValue: 1, // textSpeechBubble 나타남
          duration: 300,
          useNativeDriver: true, // opacity는 네이티브에서 처리 가능
        }),
        Animated.timing(bubbles[id].translateYText, {
          toValue: 0, // Y 위치 고정 (위 → 원래 위치)
          duration: 300,
          useNativeDriver: true, // translateY는 네이티브에서 처리 가능
        }),
      ]),
      // 3초 대기
      Animated.delay(3000),
      // textSpeechBubble 사라지고 SpeechBubble 다시 나타남
      Animated.parallel([
        Animated.timing(bubbles[id].opacityText, {
          toValue: 0, // textSpeechBubble 사라짐
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bubbles[id].translateYText, {
          toValue: -20, // 다시 위로 이동
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bubbles[id].opacitySpeech, {
          toValue: 1, // SpeechBubble 다시 나타남
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setSelectedCloud(null); // 상태 초기화
    });
  };

  return (
    <View style={styles.container}>
      <HeaderBar title={`${myInfo?.nickname ?? "사용자"}님, 안녕하세요`} />
      {/* <View style={styles.separator}></View> */}
      <View style={styles.schrollviewContainer}>
        <ScrollView
          style={styles.cloudsScrollView}
          contentContainerStyle={styles.cloudsScrollViewContent}
          horizontal // 가로 스크롤 활성화
          showsHorizontalScrollIndicator={false} // 스크롤바 숨기기
        >
          {bubbles.map((bubble, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cloud}
              onPress={() => handleCloudPress(index)}
            >
              <View style={styles.cloudContainer}>
                <Cloud width={51} height={31} style={styles.cloudImg} />
                <View style={styles.speechBubbleContainer}>
                  {/* SpeechBubble */}
                  <Animated.View style={[{ opacity: bubble.opacitySpeech }]}>
                    <SpeechBubble width={28} height={23} style={styles.speechBubble} />
                    <DarkBlueBubble width={12} height={12} style={styles.DarkBlueBubble} />
                  </Animated.View>
                  {/* textSpeechBubble */}
                  <Animated.View
                    style={[
                      styles.textSpeechBubble,
                      {
                        opacity: bubble.opacityText, // 투명도
                        transform: [{ translateY: bubble.translateYText }], // 위에서 아래로 이동
                      },
                    ]}
                  >
                    <Text style={styles.speechBubbleText}>
                      오늘도 화이팅!!! 상쾌하고 맑은 하루~~
                    </Text>
                  </Animated.View>
                </View>
              </View>
              <Text style={styles.cloudName}>이름이</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Devide style={styles.Devide} />
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
      <TextMessage visible={isModalVisible} onClose={closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  schrollviewContainer: {
    height: "18%",
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
    top: 5,
  },
  DarkBlueBubble: {
    position: "absolute",
    top: 7,
    left: 8,
  },
  speechBubbleImg: {
    position: "absolute",
    left: 8,
    top: 4,
  },
  textSpeechBubble: {
    position: "absolute",
    width: 85,
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 12,
    top: 45,
    left: -38.5,
  },
  speechBubbleText: {
    position: "absolute",
    width: 65,
    height: 45,
    fontWeight: "500",
    color: colors.black,
    textAlign: "center",
    fontSize: 10,
    top: 12,
    left: 10,
    // backgroundColor: colors.light_yellow,
  },
  cloudName: {
    alignSelf: "center",
    color: colors.white,
    fontSize: 10,
    fontWeight: "500",
    marginTop: 2,
    zIndex: -5,
  },
  Devide: {
    alignSelf: "center",
    position: "absolute",
    top: 195,
    zIndex: -5,
  },
  // separator: {
  //   marginTop: 23,
  //   marginHorizontal: 20,
  //   height: 10,
  //   backgroundColor: colors.grayA78,
  // },
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
