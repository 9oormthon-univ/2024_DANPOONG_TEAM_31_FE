import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import HeaderBar from "@/components/header_bar";
import colors from "@/constants/colors";
import { BlurView } from "expo-blur";
import { randomPosition } from "../../modules/randomPosition";
import { useMemoStore } from "@/stores/memo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BouncingComponent from "@/components/BouncingComponent";
import { useMemo } from "react";

import Cloud from "@/assets/images/icons/cloud.svg";
import SpeechBubble from "@/assets/images/icons/speech_bubble_default.svg";
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

  // TODO add deps
  const CloudLetters = useMemo(() => {
    return [1, 2, 3].map((value) => (
      <View key={value} style={{ position: "absolute", ...randomPosition() }}>
        <BouncingComponent timingIndex={value}>
          <CloudLetter />
        </BouncingComponent>
      </View>
    ));
  }, []);


  return (
    <View style={styles.container}>
      <HeaderBar title="민정님, 안녕하세요" />
      <View style={styles.cloudsContainer}>
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <View key={value} style={styles.cloud}>
            <SpeechBubble />
            <Heart style={{ position: "absolute", top: 4.31, right: 10.9 }} />
            <Cloud />
            <Text style={styles.cloudName}>이름이</Text>
          </View>
        ))}
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
      <View style={styles.cloudsBoundary}>
        {[1, 2, 3].map((value) => (
          <TouchableOpacity
          key={value}
          style={{ position: "absolute", ...randomPosition() }}
          onPress={openModal}
          >
            <BouncingComponent timingIndex={value}>
              <CloudLetter />
            </BouncingComponent>
          </TouchableOpacity>
        ))}
      </View>

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
  cloudsContainer: {
    paddingTop: 22,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  cloud: {
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 2.68,
  },
  cloudName: {
    alignSelf: "center",
    color: colors.white,
    fontSize: 10,
    fontWeight: "500",
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
