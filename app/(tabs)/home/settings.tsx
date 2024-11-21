import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import CheckedBtn from "@/assets/images/icons/checked_btn.svg";
import UncheckedBtn from "@/assets/images/icons/unchecked_btn.svg";
import ToggledBtn from "@/assets/images/icons/toggled_btn.svg";
import UntoggledBtn from "@/assets/images/icons/untoggled_btn.svg";
import UpArrow from "@/assets/images/icons/up_arrow.svg";
import DownArrow from "@/assets/images/icons/down_arrow.svg";
import HeaderBar from "@/components/header_bar";
import { Picker } from "@react-native-picker/picker";
import colors from "@/constants/colors";
import { useRouter } from "expo-router";

export default function Settings(){
    const router = useRouter();
    const [expandedSection, setExpandedSection] = useState<string | null>(null); // 열려있는 섹션 상태 관리
    const [dailyAlarm, setDailyAlarm] = useState(false); // 매일 알림 토글 상태
    const [letterAlarm, setLetterAlarm] = useState(true); // 편지 알림 토글 상태
    const [vibration, setVibration] = useState(false); // 진동 알림 토글 상태
    // 상태 토글 함수
    const toggleSwitch = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
        setter(!value); // 상태 반전
    };

    // 시간 선택
    const [selectedAmPm, setSelectedAmPm] = useState("오전");
    const [selectedHour, setSelectedHour] = useState(1);
    const [selectedMinute, setSelectedMinute] = useState(0);
    const [confirmedTime, setConfirmedTime] = useState("");

    // 폰트 선택 상태 관리
    const [selectedFont, setSelectedFont] = useState("EFDiary");

    // 알림음 선택 상태 관리
    const [selectedAlarmSound, setSelectedAlarmSound] = useState("알림음1");

    const toggleSection = (section: string) => {
        setExpandedSection((prev) => (prev === section ? null : section));
    };

    const confirmTime = () => {
        const formattedMinute = String(selectedMinute).padStart(2, "0");
        setConfirmedTime(`${selectedAmPm} ${selectedHour}:${formattedMinute}`);
    };

    const minutes = Array.from({ length: 4 }, (_, i) => i * 15); // 0, 15, 30, 45

    const fonts = [
        { id: "EFDiary", label: "다이어리체", style: { fontFamily: "EFDiary" } },
        {
            id: "Cafe24SupermagicRegular",
            label: "카페24 슈퍼매직체",
            style: { fontFamily: "Cafe24SupermagicRegular" },
        },
        {
            id: "JNEYunaRegular",
            label: "전남교육유나체",
            style: { fontFamily: "JNEYunaRegular" },
        },
    ];

    const handleFontSelect = (fontId: string) => {
    setSelectedFont(fontId);
    };

    // 알림음 목록
    const alarmSounds = [
        { id: "알림음1", label: "상쾌한 아침" },
        { id: "알림음2", label: "맑은 종소리" },
        { id: "알림음3", label: "편안한 멜로디" },
        { id: "알림음4", label: "기분 좋은 팝" },
        { id: "알림음5", label: "은은한 피아노" },
        { id: "알림음6", label: "새소리와 함께" },
    ];

    const handleAlarmSoundSelect = (soundId: string) => {
        setSelectedAlarmSound(soundId);
    };

    return (
        <View style={styles.container}>
            <HeaderBar title="설정을 변경하세요." />
            {/* 푸시 알림 시간대 */}
            <TouchableOpacity style={[
                styles.sectionHeader,
                expandedSection === "pushTime" && styles.sectionHeaderExpanded,
            ]} onPress={() => toggleSection("pushTime")}>
                <Text style={styles.sectionTitle}>푸시 알림 시간대</Text>
                {expandedSection === "pushTime" ? <UpArrow width={9} height={9} /> : <DownArrow width={9} height={9} />}
            </TouchableOpacity>
            {expandedSection === "pushTime" && (
            <View style={styles.sectionContent}>
                {/* 선택된 시간 표시 */}
                {confirmedTime && (
                <Text style={styles.confirmedTime}>선택된 시간 - {confirmedTime}</Text>
                )}

                {/* 타임 피커 */}
                <View style={styles.timePicker}>
                <Picker
                    selectedValue={selectedAmPm}
                    style={styles.pickerColumn}
                    onValueChange={(itemValue) => setSelectedAmPm(itemValue)}
                >
                    <Picker.Item label="오전" value="오전" />
                    <Picker.Item label="오후" value="오후" />
                </Picker>

                <Picker
                    selectedValue={selectedHour}
                    style={styles.pickerColumn}
                    onValueChange={(itemValue) => setSelectedHour(itemValue)}
                >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                    <Picker.Item key={hour} label={`${hour}`} value={hour} />
                    ))}
                </Picker>

                <Picker
                    selectedValue={selectedMinute}
                    style={styles.pickerColumn}
                    onValueChange={(itemValue) => setSelectedMinute(itemValue)}
                >
                    {minutes.map((minute) => (
                    <Picker.Item
                        key={minute}
                        label={`${minute}`}
                        value={minute}
                    />
                    ))}
                </Picker>
                </View>

                {/* 시간 확인 버튼 */}
                <TouchableOpacity style={styles.confirmButton} onPress={confirmTime}>
                <Text style={styles.confirmText}>확인</Text>
                </TouchableOpacity>

            </View>
            )}

            {/* 글씨체 */}
            <TouchableOpacity style={[
                styles.sectionHeader,
                expandedSection === "font" && styles.sectionHeaderExpanded,
            ]} onPress={() => toggleSection("font")}>
                <Text style={styles.sectionTitle}>글씨체</Text>
                {expandedSection === "font" ? <UpArrow width={9} height={9} /> : <DownArrow width={9} height={9} />}
            </TouchableOpacity>
            {expandedSection === "font" && (
            <View style={styles.sectionContent}>
                {fonts.map((font) => (
                <TouchableOpacity
                    key={font.id}
                    style={styles.option}
                    onPress={() => handleFontSelect(font.id)}
                >
                    {selectedFont === font.id ? (
                    <CheckedBtn width={16} height={16} />
                    ) : (
                    <UncheckedBtn width={16} height={16} />
                    )}
                    <Text style={[styles.optionText, font.style]}>
                    {font.label}
                    </Text>
                </TouchableOpacity>
                ))}
            </View>
            )}

            {/* 알림음 */}
            <TouchableOpacity style={[
                styles.sectionHeader,
                expandedSection === "alarmSound" && styles.sectionHeaderExpanded,
            ]} onPress={() => toggleSection("alarmSound")}>
                <Text style={styles.sectionTitle}>알림음</Text>
                {expandedSection === "alarmSound" ? <UpArrow width={9} height={9} /> : <DownArrow width={9} height={9} />}
            </TouchableOpacity>
            {expandedSection === "alarmSound" && (
            <View style={styles.sectionContent}>
                {alarmSounds.map((sound) => (
                <TouchableOpacity
                    key={sound.id}
                    style={styles.option}
                    onPress={() => handleAlarmSoundSelect(sound.id)}
                >
                    {selectedAlarmSound === sound.id ? (
                    <CheckedBtn width={16} height={16} />
                    ) : (
                    <UncheckedBtn width={16} height={16} />
                    )}
                    <Text style={styles.optionText}>{sound.label}</Text>
                </TouchableOpacity>
                ))}
            </View>
            )}

            {/* 알림 */}
            <TouchableOpacity style={[
                styles.sectionHeader,
                expandedSection === "notifications" && styles.sectionHeaderExpanded,
            ]} onPress={() => toggleSection("notifications")}>
                <Text style={styles.sectionTitle}>알림</Text>
                {expandedSection === "notifications" ? <UpArrow width={9} height={9} /> : <DownArrow width={9} height={9} />}
            </TouchableOpacity>
            {expandedSection === "notifications" && (
            <View style={styles.sectionContent}>
                {/* 매일 알림 */}
                <View style={styles.toggleRow}>
                <Text style={styles.toggleText}>매일 알림</Text>
                <TouchableOpacity onPress={() => toggleSwitch(setDailyAlarm, dailyAlarm)}>
                    {dailyAlarm ? <ToggledBtn width={50} height={28} /> : <UntoggledBtn width={50} height={28} />}
                </TouchableOpacity>
                </View>

                {/* 편지 알림 */}
                <View style={styles.toggleRow}>
                <Text style={styles.toggleText}>편지 알림</Text>
                <TouchableOpacity onPress={() => toggleSwitch(setLetterAlarm, letterAlarm)}>
                    {letterAlarm ? <ToggledBtn width={50} height={28} /> : <UntoggledBtn width={50} height={28} />}
                </TouchableOpacity>
                </View>

                {/* 진동 */}
                <View style={styles.toggleRow}>
                <Text style={styles.toggleText}>진동</Text>
                <TouchableOpacity onPress={() => toggleSwitch(setVibration, vibration)}>
                    {vibration ? <ToggledBtn width={50} height={28} /> : <UntoggledBtn width={50} height={28} />}
                </TouchableOpacity>
                </View>
            </View>
            )}
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
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
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.blue_gray_55,
        width: 353,
        height: 52,
        justifyContent: "space-between",
        paddingRight: 14.25,
        paddingLeft: 20,
        borderTopLeftRadius: 23,
        borderTopRightRadius: 23,
        borderBottomLeftRadius: 23, // 기본 상태에서는 아래도 둥글게
        borderBottomRightRadius: 23, // 기본 상태에서는 아래도 둥글게
        marginTop: 10,
    },
    sectionHeaderExpanded: {
        borderBottomLeftRadius: 0, // 펼쳐진 상태에서는 아래 둥근 부분 제거
        borderBottomRightRadius: 0,
    },
    sectionTitle: {
      fontSize: 16,
      color: colors.white,
      fontWeight: "700",
    },
    sectionContent: {
      backgroundColor: colors.blue_gray_55,
      borderBottomRightRadius: 23,
      borderBottomLeftRadius: 23,
      marginBottom: 10,
      width: 353,
    },
    timePicker: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 168,
    },
      pickerColumn: {
        width: 100,
    },
      confirmButton: {
        marginTop: 20,
        borderRadius: 10,
        alignSelf: "center",
    },
      confirmText: {
        color: colors.white,
        fontWeight: "400",
        fontSize: 12,
        marginBottom: 20,
    },
      confirmedTime: {
        color: colors.white,
        fontSize: 12,
        alignSelf: "center",
        marginBottom: 20,
    },
    option: {
      flexDirection: "row",
      marginLeft: 20,
      marginBottom: 14,
    },
    optionText: {
      marginLeft: 10,
      color: colors.white,
      fontSize: 14,
    },
    toggleRow: {
      flexDirection: "row",
      marginLeft: 20,
      alignItems: "center",
      justifyContent: "space-between",
      paddingRight: 14,
      marginBottom: 29,
    },
    toggleText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.white,
    },
});