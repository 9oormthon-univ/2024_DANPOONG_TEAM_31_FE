import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import HeartWhale from "@/assets/images/icons/heart_whale_w_shadow.svg";
import EnterBtn from "@/assets/images/icons/darkblue_enter.svg";
import colors from "@/constants/colors";

// 키보드 가려짐 현상 원인불명

// 일정 항목 타입 정의
interface ScheduleItem {
    id: number;
    title: string;
    date: string;
    registrant: string;
    memo?: string; // 메모는 선택적으로 포함
}
  
// Props 타입 정의
interface CheckScheduleProps {
    schedule: ScheduleItem | null; // schedule이 null일 수 있음
    onClose: () => void; // 닫기 함수
    calculateDDay: (targetDate: string) => string; // D-Day 계산 함수
}

export default function CheckSchedule({
    schedule,
    onClose,
    calculateDDay,
  }: CheckScheduleProps) {
    const [inputValue, setInputValue] = useState(""); // TextInput 상태 관리
    const router = useRouter();

  if (!schedule) return null;

  // 버튼 클릭 시 텍스트 입력 필드 업데이트
  const handleButtonPress = (label: string) => {
    setInputValue((prev) => (prev ? `${prev} ${label}` : label));
  };

  // 페이지 이동 함수
  const navigateToSendingLetter = () => {
    onClose();
    router.push("/letter/sending_letter");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalContent}>
          <View style={styles.topbar}>
            <Text style={styles.title}>{schedule.title}</Text>
            <View style={styles.dDayCircle}>
              <Text
                style={[
                  styles.dDayText,
                  calculateDDay(schedule.date) === "D-Day" &&
                    styles.dDayTextHighlight,
                ]}
              >
                {calculateDDay(schedule.date)}
              </Text>
            </View>
          </View>
          <View style={styles.info}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>등록자</Text>
              <Text style={styles.infoValue}>{schedule.registrant}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>날짜</Text>
              <Text style={styles.infoValue}>{schedule.date}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>메모</Text>
              <Text style={styles.infoValue}>
                {schedule.memo || "메모가 없습니다."}
              </Text>
            </View>
          </View>
          <HeartWhale width={50} height={50} style={styles.icon} />
        </View>

        <View style={styles.bottomModalContent}>
          <Text style={styles.bottomTitle}>어떤 한마디를 남길까요?</Text>
          <View style={styles.buttonGroup}>
            {["고생했어", "파이팅", "힘내"].map((label, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => handleButtonPress(label)}
              >
                <Text style={styles.buttonText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="작성해 주세요."
              placeholderTextColor="#CACACA"
              value={inputValue} // 상태 값 바인딩
              onChangeText={setInputValue} // 사용자 입력 처리
            />
            <TouchableOpacity style={styles.closeButton} onPress={navigateToSendingLetter}>
              <EnterBtn width={52} height={52} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    position: "relative",
  },
  KeyboardAvoidingView: {
    flex: 1, // KeyboardAvoidingView에 flex 적용
  },
  modalContent: {
    width: 353,
    height: 324,
    backgroundColor: colors.blue_gray_76,
    borderRadius: 30,
    position: "absolute",
    top: 195,
    shadowColor: "#FFFFFF", // 흰색 그림자 색상
    shadowOffset: { width: 0, height: 4 }, // 그림자 위치
    shadowOpacity: 0.3, // 그림자 투명도
    shadowRadius: 10, // 그림자 블러 크기
    elevation: 10, // Android를 위한 그림자
  },
  topbar: {
    flexDirection: "row",
    marginTop: 20,
    position: "relative",
    width: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 10,
  },
  dDayCircle: {
    backgroundColor: colors.blue_lightgray_FF,
    borderRadius: 20,
    width: 48,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 20,
  },
  dDayTextHighlight: {
    color: colors.red,
  },
  dDayText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.blue_gray_46,
  },
  info: {
    marginTop: 41,
    marginLeft: 33,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 9,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.white,
    width: 34,
    textAlign: "right",
    marginRight: 9,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "400",
    color: colors.white,
    flex: 1,
    textAlign: "left",
  },
  icon: {
    alignSelf: "center",
    position: "absolute",
    bottom: 27,
  },
  bottomModalContent: {
    backgroundColor: "#F5F5F5",
    height: 150,
    width: 353,
    borderRadius: 30,
    position: "absolute",
    bottom: 107,
  },
  bottomTitle: {
    marginTop: 20,
    marginLeft: 29,
    fontWeight: '700',
    fontSize: 16,
    color: colors.blue_gray_46,
  },
  buttonGroup: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  button: {
    borderColor: colors.blue_gray_46,
    borderWidth: 1,
    borderRadius: 26,
    paddingHorizontal: 26,
    paddingVertical: 11,
    alignItems: "center",
    marginRight: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.blue_gray_46,
  },
  inputContainer: {
    width: 353,
    height: 48,
    borderRadius: 30,
    backgroundColor: colors.white,
    position: "absolute",
    bottom: 0,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.blue_gray_46,
    marginLeft: 26,
  },
  closeButton: {
    position: "absolute",
    right: 0,
  },
});
