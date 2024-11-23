import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Audio } from "expo-av"; // expo-av 사용
import * as FileSystem from "expo-file-system";
import MicrophoneBtn from "@/assets/images/icons/microphone_btn.svg";
import EnterButton from "@/assets/images/icons/darkblue_enter.svg";
import PlayBtn from "@/assets/images/icons/play_btn.svg";
import LeftArrow from "@/assets/images/icons/left_arrow.svg";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";
import HeaderBar from "@/components/header_bar";
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/authStore";
import { LetterContext } from "@/contexts/LetterContext";

export default function VoiceMessage() {
  const router = useRouter();

  // 오디오 녹음 및 재생 상태 관리
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [playbackInstance, setPlaybackInstance] = useState<Audio.Sound | null>(null);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);

  // 녹음 상태
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState("-");
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [isRecordingFinished, setIsRecordingFinished] = useState(false);

  // 권한 요청
  useEffect(() => {
    (async () => {
      try {
        const { granted } = await Audio.requestPermissionsAsync();
        if (!granted) {
          Alert.alert("Permission Denied", "마이크 접근 권한이 필요합니다.");
          return;
        }

        // 오디오 모드 설정
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true, // iOS에서 녹음 활성화
          playsInSilentModeIOS: true, // 무음 모드에서도 재생 가능
        });

        console.log("오디오 모드 설정 완료");
      } catch (error) {
        console.error("오디오 모드 설정 실패:", error);
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
      setRecordingDuration(0);
      setRecordingTime("-");
      setIsRecordingFinished(false);

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error("녹음 시작 에러:", error);
      Alert.alert("녹음 시작 실패", "녹음을 시작할 수 없습니다.");
    }
  };

  // 녹음 중지
  const stopRecording = async () => {
    try {
      console.log("녹음 중지");
      setIsRecording(false);
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      if (!uri) {
        throw new Error("녹음 파일 경로를 찾을 수 없습니다.");
      }

      console.log("녹음 파일 기본 경로:", uri);

      const newUri = `${FileSystem.documentDirectory}recording.m4a`;
      await FileSystem.copyAsync({ from: uri, to: newUri });
      console.log("녹음 파일 새 경로:", newUri);

      setRecordingUri(newUri);
      setIsRecordingFinished(true);
      setRecording(null); // 녹음 객체 해제
    } catch (error) {
      console.error("녹음 중지 에러:", error);
      Alert.alert("녹음 중지 실패", "녹음을 중지할 수 없습니다.");
    }
  };

  // 녹음 재생
  const playRecording = async () => {
    if (recordingUri) {
      try {
        console.log("녹음 재생");
        if (playbackInstance) {
          await playbackInstance.unloadAsync();
        }

        const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
        setPlaybackInstance(sound);

        await sound.setVolumeAsync(1.0);
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

  const { familyId } = useUserStore();
  const { accessToken } = useAuthStore();
  const [letter, setLetter] = useContext(LetterContext);

  const handleSendLetter = async () => {
    const fetchPresignedUrl = await fetch(
      `http://15.164.29.113:8080/letter/url?familyId=${familyId}&receiverId=${letter?.receiverId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => res.json());

    console.log({ familyId, receiverId: letter?.receiverId });
    console.log("fetchPresignedUrl", fetchPresignedUrl);

    // fetch audio
    const recordResponse = await fetch(recordingUri!);
    const recordBlob = await recordResponse.blob();

    console.log("imageBlob", recordBlob.size);

    const uploadS3 = await fetch(fetchPresignedUrl?.presignedUrl, {
      method: "PUT",
      body: recordBlob,
      headers: {
        "Content-Type": "audio/m4a",
      },
    });

    console.log("uploadS3", uploadS3);

    const sendImageText = await fetch("http://15.164.29.113:8080/letter/file", {
      method: "POST",
      body: JSON.stringify({
        familyId,
        scheduleId: 0,
        receiverId: letter?.receiverId,
        textContent: letter?.textContent,
        letterType: "AUDIO",
        keyName: fetchPresignedUrl?.keyName,
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("sendImageText", sendImageText);

    router.push("/letter/sending_letter");
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="음성 메시지를 기록중입니다." />
      <TouchableOpacity style={styles.leftArrow} onPress={() => router.back()}>
        <LeftArrow width={6} height={12} />
      </TouchableOpacity>

      {/* 녹음 및 재생 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={
            isRecording ? stopRecording : isRecordingFinished ? playRecording : startRecording
          }
        >
          {isRecordingFinished ? (
            <PlayBtn width={103} height={103} />
          ) : (
            <MicrophoneBtn width={103} height={103} />
          )}
          <Text style={styles.buttonText}>
            {isRecordingFinished ? "들어보기" : isRecording ? "녹음 중..." : "말씀해주세요."}
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
    position: "relative",
  },
  leftArrow: {
    position: "absolute",
    left: 30,
    top: 374,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 243,
  },
  button: {},
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
    alignSelf: "center",
    position: "absolute",
    top: 645,
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
