import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import HeartWhale from "@/assets/images/icons/heart_whale_w_shadow.svg";
import CloudWMessagebubble from "@/assets/images/icons/calendar_cloud_like.svg";
import CloudWNoti from "@/assets/images/icons/cloud_w_notification.svg";
import RightArrow from "@/assets/images/icons/right_arrow.svg";
import LeftArrow from "@/assets/images/icons/left_arrow.svg";
import BackgroundImg from "@/assets/images/background.svg";
import HeaderBar from "@/components/header_bar";
import LetterboxDate from "@/app/letterbox/letterbox_date";
import colors from "@/constants/colors";

interface MessageData {
    [key: string]: {
      messages: number;
    };
}

// 월별 일수 데이터
const months = [
    { name: "1월", days: 31 },
    { name: "2월", days: 28 }, // 윤년 처리 필요
    { name: "3월", days: 31 },
    { name: "4월", days: 30 },
    { name: "5월", days: 31 },
    { name: "6월", days: 30 },
    { name: "7월", days: 31 },
    { name: "8월", days: 31 },
    { name: "9월", days: 30 },
    { name: "10월", days: 31 },
    { name: "11월", days: 30 },
    { name: "12월", days: 31 },
];

export default function LetterboxCalendar() {
    const [modalVisible, setModalVisible] = useState(false); // 모달 상태
    const [currentYear, setCurrentYear] = useState(2024); // 현재 연도
    const [currentMonth, setCurrentMonth] = useState(10); // 0부터 시작 (11월)
    const [selectedDate, setSelectedDate] = useState<string | null>(null); // 선택된 날짜

    const heartDates = [
        { date: "11.10", label: "거북이" },
        { date: "11.12", label: "거북이" },
        { date: "11.20", label: "토끼" },
        { date: "11.25", label: "고래" },
    ];

    // 샘플 메시지 데이터
    const messageData: MessageData = {
        "2024-11-01": { messages: 3 },
        "2024-11-02": { messages: 1 },
        "2024-11-03": { messages: 5 },
        "2024-11-05": { messages: 2 },
        "2024-11-06": { messages: 3 },
        "2024-11-07": { messages: 1 },
        "2024-11-15": { messages: 4 },
        "2024-11-16": { messages: 2 },
        "2024-11-18": { messages: 1 },
        "2024-11-20": { messages: 1 },
        "2024-11-21": { messages: 3 },
        "2024-11-22": { messages: 2 },
        "2024-11-25": { messages: 2 },
        "2024-11-27": { messages: 1 },
        "2024-11-28": { messages: 5 },
        "2024-11-29": { messages: 4 },
    };

    // 월 변경 핸들러
    const changeMonth = (direction: "prev" | "next") => {
        if (direction === "prev") {
            if (currentMonth === 0) {
                setCurrentYear((prev) => prev - 1);
                setCurrentMonth(11);
            } else {
                setCurrentMonth((prev) => prev - 1);
            }
        } else {
            if (currentMonth === 11) {
                setCurrentYear((prev) => prev + 1);
                setCurrentMonth(0);
            } else {
                setCurrentMonth((prev) => prev + 1);
            }
        }
    };

    const currentMonthData = months[currentMonth];
    const days = Array.from({ length: currentMonthData.days }, (_, i) => i + 1);

    return (
      <SafeAreaView style={styles.safeArea}>
        {/* 배경 이미지 */}
        <BackgroundImg style={styles.background} />
        <View style={styles.container}>
          <HeaderBar title="캘린더를 확인해보세요." />
          <ScrollView horizontal >
            {/* 하트 표시된 날짜 */}
            <View style={styles.heartDatesContainer}>
              {heartDates.map((item, index) => (
                <View key={index} style={styles.heartDateItem}>
                    <View style={styles.heartWhaleDateContainer}>
                        <CloudWMessagebubble width={52.61} height={58.35} />
                        <Text style={styles.heartDateText}>{item.date}</Text>
                    </View>
                    <Text style={styles.heartDateLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
            <View style={styles.devide}></View>
            {/* 캘린더 */}
            <View style={styles.calendarWrapper}>
                {/* 헤더 (월, 좌우 화살표) */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => changeMonth("prev")}>
                        <LeftArrow width={10} height={10} style={styles.arrow} />
                    </TouchableOpacity>
                    <Text style={styles.monthTitle}>
                        {currentYear}.{(currentMonth + 1).toString().padStart(2, "0")}
                    </Text>
                    <TouchableOpacity onPress={() => changeMonth("next")}>
                        <RightArrow width={10} height={10} style={styles.arrow} />
                    </TouchableOpacity>
                </View>

                {/* 날짜 표시 */}
                <ScrollView contentContainerStyle={styles.calendar}>
                    {days.map((day) => {
                        const dateKey = `${currentYear}-${(currentMonth + 1)
                            .toString()
                            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                        const hasMessages = messageData[dateKey]?.messages > 0;

                        return (
                            <View key={day} style={styles.dayContainer}>
                                {hasMessages && (
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSelectedDate(dateKey); // 날짜 설정
                                                setModalVisible(true); // 모달 열기
                                            }}
                                        >
                                            <CloudWNoti
                                                width={39}
                                                height={31}
                                                style={styles.cloudIcon}
                                            />
                                            <Text style={styles.messageText}>
                                                {messageData[dateKey]?.messages}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                <Text style={styles.dayText}>
                                    {(currentMonth + 1).toString().padStart(2, "0")}.{day}
                                </Text>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>

        </View>
        <HeartWhale width={53} height={40.92} style={styles.heartWhaleIcon}/>

        {/* LetterboxDate 모달 */}
        {modalVisible && (
            <LetterboxDate
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        )}
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        position: "relative",
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
    },
    heartDatesContainer: {
        flexDirection: "row",
        marginTop: 22,
        marginHorizontal: 20,
    },
    heartDateItem: {
        alignItems: "center",
        marginRight: 10,
    },
    heartWhaleDateContainer: {
        position: "relative",
    },
    heartDateText: {
        position: "absolute",
        fontSize: 8,
        color: colors.black,
        fontWeight: '300',
        right: 5,
        top: 4,
    },
    heartDateLabel: {
        fontSize: 10,
        color: colors.white,
        fontWeight: '500',
    },
    devide: {
        width: 353,
        height: 1,
        borderRadius: 1,
        backgroundColor: colors.grayA78,
        alignSelf: "center",
        position: "absolute",
        top: 200,
    },
    calendarWrapper: {
        width: 353,
        borderRadius: 20,
        alignSelf: "center",
        position: "absolute",
        top: 231,
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    arrow: {
        marginHorizontal: 10,
    },
    monthTitle: {
        fontSize: 12,
        color: colors.white,
        fontWeight: "700",
    },
    calendar: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    dayContainer: {
        width: "14%", // 일주일 7일 기준
        height: 80,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    dayText: {
        fontSize: 10,
        fontWeight: '500',
        color: colors.white,
    },
    cloudIcon: {
        marginBottom: 6,
        position: "relative",
    },
    messageText: {
        position: "absolute",
        color: colors.white,
        fontSize: 9,
        fontWeight: '500',
        top: 17.5,
        left: 27.5,
    },
    heartWhaleIcon: {
        position: "absolute",
        top: 732,
        alignSelf: "center",
    },
});