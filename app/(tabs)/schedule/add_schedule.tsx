import React, { useState, useEffect } from "react";
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
  Alert,
} from "react-native";
import EditBtn from "@/assets/images/icons/edit_btn.svg";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";
import HeaderBar from "@/components/header_bar";
import { useAuthStore } from "@/stores/authStore";
import { api } from "@/modules/api";

export default function AddSchedule() {
    const router = useRouter();
  const [title, setTitle] = useState(""); // 일정명 입력값
  const [date, setDate] = useState(""); // 날짜 입력값
  const [memo, setMemo] = useState(""); // 메모 입력값
  const [status, setStatus] = useState("작성전"); // 상태 텍스트 관리

  const accessToken = useAuthStore((state) => state.accessToken);

  // `title` 상태에 따라 status 업데이트
  useEffect(() => {
    if (title.trim() === "") {
      setStatus("작성전");
    } else if (title.trim().length > 0 && title.trim().length < 5) {
      setStatus("작성중");
    } else {
      setStatus("작성완료");
    }
  }, [title]);

  // 날짜 형식 변환 함수
  const formatDate = (inputDate: string) => {
    const dateParts = inputDate.split(".");
    if (dateParts.length === 3) {
      const [year, month, day] = dateParts;
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return inputDate; // 형식이 올바르지 않으면 원본 그대로 반환
  };

  const addSchedule = async () => {
    if (!accessToken) {
      Alert.alert("Error", "로그인이 필요합니다.");
      return;
    }

    if (!title || !date) {
      Alert.alert("Error", "일정명과 날짜를 입력해주세요.");
      return;
    }

    const formattedDate = formatDate(date);

    try {
      const response = await api.post(
        "/api/schedule/add",
        null, // POST 요청의 경우, 요청 바디는 필요 없으므로 null로 설정
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            title,
            memo,
            date: formattedDate,
          },
        }
      );

      console.log("일정 추가 성공:", response.data);
      router.push("/schedule/sending_schedule"); // 일정 목록 페이지로 이동
    } catch (error) {
      console.error("일정 추가 실패:", error);
      Alert.alert("Error", "일정 추가 중 오류가 발생했습니다.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <HeaderBar title="일정의 세부내용이예요." />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {/* 상단 일정명 입력 영역 */}
          <View style={styles.titleBar}>
            <View style={styles.iconContainer}>
              <EditBtn width={40} height={40} />
            </View>
            <TextInput
              style={styles.titleTextInput}
              placeholder="일정명을 입력하세요."
              placeholderTextColor={colors.white}
              value={title}
              onChangeText={setTitle}
            />
            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>{status}</Text>
            </View>
          </View>

          {/* 날짜와 메모 입력 영역 */}
          <View style={styles.infoBox}>
            <View style={styles.dateInfoBox}>
              <Text style={styles.dateText}>날짜</Text>
              <TextInput
                style={styles.infoTextInput}
                placeholder="날짜를 입력하세요. (예: 24.11.19)"
                placeholderTextColor={"#CACACA"}
                value={date}
                onChangeText={setDate}
              />
            </View>
            <View style={styles.memoInfoBox}>
              <Text style={styles.memoText}>메모</Text>
              <TextInput
                style={styles.infoTextInput}
                placeholder="메모를 작성해 주세요."
                placeholderTextColor={"#CACACA"}
                value={memo}
                onChangeText={setMemo}
                multiline
              />
            </View>

            {/* 완료 버튼 */}
            <TouchableOpacity style={styles.completeButton} 
            onPress={addSchedule}
            >
              <Text style={styles.completeButtonText}>완료</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
  },
  titleBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.blue_gray_55,
    borderRadius: 30,
    width: 353,
    height: 66,
    marginBottom: 15,
    marginTop: 19,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  titleTextInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
    marginLeft: 10,
  },
  statusContainer: {
    height: 25,
    width: 54,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blue_lightgray_FF,
    borderRadius: 20,
    marginRight: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.blue_gray_46,
  },
  infoBox: {
    backgroundColor: colors.blue_gray_55,
    borderRadius: 19,
    width: 353,
    height: 226,
    position: "relative",
  },
  dateInfoBox: {
    flexDirection: "row",
    marginLeft: 26,
    marginTop: 22,
    justifyContent: "center",
  },
  dateText: {
    fontWeight: "700",
    fontSize: 13,
    color: colors.white,
    marginRight: 9,
    height: 16,
    paddingTop: 2,
  },
  memoInfoBox: {
    flexDirection: "row",
    marginLeft: 26,
    marginTop: 9,
    justifyContent: "center",
  },
  memoText: {
    fontWeight: "700",
    fontSize: 13,
    color: colors.white,
    marginRight: 9,
    height: 16,
    marginTop: 5,
    paddingTop: 1,
  },
  infoTextInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: "400",
    color: colors.white,
  },
  completeButton: {
    backgroundColor: colors.light_yellow,
    borderRadius: 20,
    width: 68,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 10,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.blue_gray_46,
  },
});
