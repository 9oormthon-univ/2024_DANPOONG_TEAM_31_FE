import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import PlusBtn from "@/assets/images/icons/plus_button.svg";
import RightArrow from "@/assets/images/icons/right_arrow.svg";
import colors from "@/constants/colors";

export default function Schedule() {
  // 임시 데이터
  const schedules = [
      { id: 1, title: "일정명1", date: "24.11.19", registrant: "고래"},
      { id: 2, title: "일정명2", date: "24.11.20", registrant: "상어"},
      { id: 3, title: "일정명3", date: "24.12.01", registrant: "거북이"},
      { id: 4, title: "일정명4", date: "24.12.10", registrant: "물고기"},
  ];

  // 현재 날짜 가져오기
  const today = new Date();

  // D-Day 계산 함수
  const calculateDDay = (targetDate: string) => {
    // 날짜 형식 변환: "24.11.19" -> "2024-11-19"
    const formattedDate = `20${targetDate.split(".").join("-")}`;

    // 한국 시간(KST) 기준으로 targetDate 생성
    const target = new Date(`${formattedDate}T00:00:00+09:00`);

    // 오늘 날짜 (한국 시간 기준)
    const now = new Date();
    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
    ); // UTC 시간 제거 후 자정 기준 한국 시간

    // 날짜 차이 계산 (밀리초 단위 -> 일 단위)
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return diff === 0 ? "D-Day" : `D-${diff}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {schedules.map((schedule) => (
            <View key={schedule.id} style={styles.scheduleItem}>
                <View style={styles.scheduleInfo}>
                    <View style={styles.iconCircle}></View>
                    <View>
                        <Text style={styles.scheduleTitle} numberOfLines={1}>
                            {schedule.title}
                        </Text>
                        <Text style={styles.scheduleDetails}>
                            {schedule.date} {schedule.registrant}
                        </Text>
                    </View>
                </View>
                <View style={styles.rightSection}>
                  <View
                    style={styles.dDayCircle}
                  >
                     <Text
                        style={[
                          styles.dDayText,
                          calculateDDay(schedule.date) === "D-Day" && styles.dDayTextHighlight,
                        ]}
                      >
                        {calculateDDay(schedule.date)}
                      </Text>
                  </View>
                  <RightArrow width={4.5} height={9} />
                </View>
            </View>
        ))}
        <TouchableOpacity style={styles.addButton}>
          <PlusBtn width={52} height={52} />
        </TouchableOpacity>
      </ScrollView>
          
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollContent: {
  },
  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.blue_gray_55,
    borderRadius: 30,
    width: 353,
    height: 66,
    marginBottom: 10,
  },
  scheduleInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    backgroundColor: colors.blue_lightgray_FF,
    borderRadius: 20,
    marginLeft: 10,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 2,
    marginLeft: 12,
  },
  scheduleDetails: {
    fontSize: 13,
    fontWeight: "400",
    color: colors.white,
    marginLeft: 12,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 19,
  },
  dDayCircle: {
    backgroundColor: colors.blue_lightgray_FF,
    borderRadius: 20,
    width: 48,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  dDayTextHighlight: {
    color: colors.red,
  },
  dDayText: {
      fontSize: 11,
      fontWeight: "700",
      color: colors.blue_gray_46,
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});
