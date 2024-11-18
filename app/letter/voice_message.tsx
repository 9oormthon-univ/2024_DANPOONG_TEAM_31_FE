import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useAudioRecorder, RecordingPresets } from "expo-audio";
import { Audio } from "expo-av"; // expo-av 사용
import * as FileSystem from "expo-file-system";
import MicrophoneBtn from "@/assets/images/icons/microphone_btn.svg";
import EnterButton from "@/assets/images/icons/darkblue_enter.svg";
import PlayBtn from "@/assets/images/icons/play_btn.svg";
import LeftArrow from "@/assets/images/icons/left_arrow.svg";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";

export default function VoiceMessage() {
    const router = useRouter();

    // 오디오 녹음 및 재생 상태 관리
    const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const [playbackInstance, setPlaybackInstance] = useState<Audio.Sound | null>(null); // 재생 상태 추가
    const [recordingUri, setRecordingUri] = useState<string | null>(null); // 복사된 파일 경로 저장

    // 녹음 상태
    const [isRecording, setIsRecording] = useState(false); // 녹음 중 상태
    const [recordingTime, setRecordingTime] = useState("-");
    const [recordingDuration, setRecordingDuration] = useState<number>(0);
    const [isRecordingFinished, setIsRecordingFinished] = useState(false); // 녹음 완료 상태

    // 권한 요청
    useEffect(() => {
        (async () => {
            const { granted } = await Audio.requestPermissionsAsync();
            if (!granted) {
                Alert.alert("Permission Denied", "마이크 접근 권한이 필요합니다.");
            }
        })();
    }, []);

    // 녹음 시간 업데이트
    useEffect(() => {
        if (isRecording) {
            const interval = setInterval(() => {
                setRecordingDuration((prev) => {
                    const updatedDuration = prev + 1;
                    const minutes = Math.floor(updatedDuration / 60);
                    const seconds = updatedDuration % 60;
                    setRecordingTime(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}초`);
                    return updatedDuration;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRecording]);

    // 녹음 시작
    const startRecording = async () => {
        try {
            console.log("녹음 시작");
            setRecordingDuration(0); // 녹음 시간 초기화
            setRecordingTime("-"); // 초기화
            setIsRecordingFinished(false); // 녹음 완료 상태 초기화
            setIsRecording(true); // 녹음 중 상태 설정
            await recorder.record(); // 녹음 시작
        } catch (error) {
            console.error("녹음 시작 에러:", error);
            Alert.alert("녹음 시작 실패", "녹음을 시작할 수 없습니다.");
            setIsRecording(false); // 녹음 중 상태 초기화
        }
    };

    // 녹음 중지
    const stopRecording = async () => {
        try {
            console.log("녹음 중지");
            await recorder.stop(); // 녹음 중지
    
            const uri = recorder.uri;
            if (!uri) {
                throw new Error("녹음 파일 경로를 찾을 수 없습니다.");
            }
    
            console.log("녹음 파일 기본 경로:", uri);
    
            // 녹음 파일을 DocumentDirectory로 복사
            const newUri = `${FileSystem.documentDirectory}recording.m4a`;
            await FileSystem.copyAsync({ from: uri, to: newUri });
            console.log("녹음 파일 새 경로:", newUri);
    
            setRecordingUri(newUri); // 복사된 파일 경로 저장
            setIsRecording(false); // 녹음 중 상태 해제
            setIsRecordingFinished(true); // 녹음 완료 상태 설정
        } catch (error) {
            console.error("녹음 종료 에러:", error);
            Alert.alert("녹음 종료 실패", "녹음을 종료할 수 없습니다.");
        }
    };    

    // 녹음 재생
    const playRecording = async () => {
        if (recordingUri) {
            try {
                console.log("녹음 재생");
                // 이전 재생 객체 정리
                if (playbackInstance) {
                    await playbackInstance.unloadAsync();
                }
    
                // 새로운 재생 객체 생성
                const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
                setPlaybackInstance(sound);
    
                // 볼륨 설정 (최대 1.0)
                await sound.setVolumeAsync(1.0); // 볼륨을 최대치로 설정
    
                // 재생 시작
                await sound.playAsync();
            } catch (error) {
                console.error("녹음 재생 에러:", error);
                Alert.alert("재생 실패", "녹음을 재생할 수 없습니다.");
            }
        } else {
            Alert.alert("녹음된 파일 없음", "먼저 녹음을 시작하세요.");
        }
    };

    // 컴포넌트 해제 시 재생 객체 정리
    useEffect(() => {
        return () => {
            if (playbackInstance) {
                playbackInstance.unloadAsync();
            }
        };
    }, [playbackInstance]);

    const handleSendLetter = () => {
        // SendingLetter 화면으로 이동
        router.push("/letter/sending_letter");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.leftArrow} onPress={() => router.back()}>
                <LeftArrow width={6} height={12} />
            </TouchableOpacity>

            {/* 녹음 및 재생 버튼 */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={
                        isRecording
                            ? stopRecording // 녹음 중지
                            : isRecordingFinished
                            ? playRecording // 재생
                            : startRecording // 녹음 시작
                    }
                >
                    {isRecordingFinished ? (
                        <PlayBtn width={103} height={103} />
                    ) : (
                        <MicrophoneBtn width={103} height={103} />
                    )}
                    <Text style={styles.buttonText}>
                        {isRecordingFinished
                            ? "들어보기"
                            : isRecording
                            ? "녹음 중..."
                            : "말씀해주세요."}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* 하단 바 */}
            <View style={styles.bottomBar}>
                <Text style={styles.recordingTimeText}>{recordingTime}</Text>
                <TouchableOpacity style={styles.enterButton} onPress={handleSendLetter}>
                    <EnterButton width={52} height={52} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    leftArrow: {
        position: "absolute",
        left: 30,
        top: "50%",
    },
    buttonContainer: {
        alignItems: "center",
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        marginTop: 10,
        fontSize: 20,
        color: colors.white,
        fontWeight: "500",
        textAlign: "center",
    },
    bottomBar: {
        width: 353,
        height: 48,
        borderRadius: 30,
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        top: 695,
    },
    recordingTimeText: {
        fontSize: 16,
        color: colors.blue_gray_46,
        fontWeight: "500",
        marginLeft: 19,
    },
    enterButton: {
        position: "absolute",
        right: -1,
    },
});
