import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from "react-native";
import PlusBtn from "@/assets/images/icons/plus_button.svg";
import RightArrow from "@/assets/images/icons/right_arrow.svg";
import HeartWhale from "@/assets/images/icons/heart_whale_w_shadow.svg";
import HeaderBar from "@/components/header_bar";
import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import CheckSchedule from "./check_schedule";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/modules/api";
import { useAuthStore } from "@/stores/authStore";

// 일정 항목의 타입 정의
interface ScheduleItem {
  scheduleId: number;
  title: string;
  date: string;
  author: string;
  memo?: string;
  dday: string;
}

export default function Schedule() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  // Auth Store에서 accessToken 가져오기
  const accessToken = useAuthStore((state) => state.accessToken);

  // 일정 전체 조회
  useEffect(() => {
    const fetchSchedules = async () => {
      if (!accessToken) {
        setError("로그인이 필요합니다."); // 토큰이 없으면 에러 처리
        return;
      }

      try {
        const response = await fetch("http://15.164.29.113:8080/api/schedule/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ScheduleItem[] = await response.json();
        console.log("API 응답 데이터:", data);
        setSchedules(data);
      } catch (err: any) {
        console.error("일정 전체 조회 실패:", err);
        setError(err.message);
      }
    };

    fetchSchedules();
  }, [accessToken]);

  const openModal = (schedule: ScheduleItem) => {
    setSelectedSchedule(schedule);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSchedule(null);
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="등록된 일정을 확인해보세요." />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {schedules.map((schedule) => (
          <TouchableOpacity key={schedule.scheduleId} onPress={() => openModal(schedule)}>
            <View style={styles.scheduleItem}>
              <View style={styles.scheduleInfo}>
                <View style={styles.iconCircle}></View>
                <View>
                  <Text style={styles.scheduleTitle} numberOfLines={1}>
                    {schedule.title}
                  </Text>
                  <Text style={styles.scheduleDetails}>
                    {schedule.date} {schedule.author}
                  </Text>
                </View>
              </View>
              <View style={styles.rightSection}>
                <View style={styles.dDayCircle}>
                  <Text
                    style={[
                      styles.dDayText,
                      schedule.dday === "0" && styles.dDayTextHighlight,
                    ]}
                  >
                    D-{schedule.dday}
                  </Text>
                </View>
                <RightArrow width={4.5} height={9} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/schedule/add_schedule")}
        >
          <PlusBtn width={52} height={52} />
        </TouchableOpacity>
      </ScrollView>

      <HeartWhale width={53} height={40.92} style={styles.heartWhale} />

      <Modal visible={modalVisible} transparent={true} animationType="fade">
      {selectedSchedule && (
        <CheckSchedule schedule={selectedSchedule} onClose={closeModal} />
      )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  scrollContent: {
    marginTop: 19,
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
  heartWhale: {
    position: "absolute",
    bottom: 116.08,
  },
});
