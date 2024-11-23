import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import EditBtn from "@/assets/images/icons/black_edit_btn.svg";
import EmptyImage from "@/assets/images/icons/image.svg";
import PlusBtn from "@/assets/images/icons/black_plus_btn.svg";
import EnterButton from "@/assets/images/icons/darkblue_enter.svg";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";
import HeaderBar from "@/components/header_bar";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/modules/api";
import { useUserStore } from "@/stores/userStore";
import { LetterContext } from "@/contexts/LetterContext";
import { useAuthStore } from "@/stores/authStore";

export default function TextMessage() {
  const router = useRouter();

  const [message, setMessage] = useState(""); // 텍스트 입력값 관리
  const [statusText, setStatusText] = useState("작성전"); // 상태 텍스트 관리
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // 선택된 이미지 URI

  const { familyId } = useUserStore();
  const [letter, setLetter] = useContext(LetterContext);

  const handleInputChange = (text: string) => {
    setMessage(text);
    if (text.trim() === "") {
      setStatusText("작성전");
    } else {
      setStatusText("작성중");
    }
  };

  const handleComplete = () => {
    if (message.trim() !== "") {
      setLetter?.({ textContent: message.trim() });
      setStatusText("작성완료");
    }
  };

  const pickImage = async () => {
    // 사진첩 접근 권한 요청
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("사진첩 접근 권한이 필요합니다.");
      return;
    }

    // 사진첩에서 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setSelectedImage(result.assets[0].uri); // 선택된 이미지 URI 저장
    }
  };

  //only text 편지 전송
  const { mutate: sendOnlyTextLetter } = useMutation({
    mutationFn: () =>
      api.post("/letter/text", {
        familyId,
        receiverId: letter?.receiverId,
        textContent: letter?.textContent,
      }),
  });

  const { accessToken } = useAuthStore();

  // 편지 전송 함수
  const handleSendLetter = async () => {
    if (selectedImage === null) {
      //only text
      sendOnlyTextLetter();
    } else {
      // S3
      console.log(selectedImage);

      // presigned url
      //   const fetchPresignedUrl = await api
      //     .get("/letter/url", { params: { familyId: familyId, receiverId: letter?.receiverId } })
      //     .then((res) => res.data);

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

      // fetch image
      const imageResponse = await fetch(selectedImage);
      const imageBlob = await imageResponse.blob();

      console.log("imageBlob", imageBlob.size);

      const uploadS3 = await fetch(fetchPresignedUrl?.presignedUrl, {
        method: "PUT",
        body: imageBlob,
        headers: {
          "Content-Type": "image/jpeg",
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
          letterType: !!message ? (!!message && !!selectedImage ? "IMAGETEXT" : "TEXT") : "IMAGE",
          keyName: fetchPresignedUrl?.keyName,
        }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("sendImageText", sendImageText);
    }

    // SendingLetter 화면으로 이동
    router.push("/letter/sending_letter");
  };

  const handleTagPress = (tag: string) => {
    // 태그 클릭 시 messageInput에 추가
    setMessage((prevMessage) => (prevMessage ? `${prevMessage} ${tag}` : tag));
    setStatusText("작성완료");
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="텍스트 메시지를 작성중입니다." />
      {/* 상단 메세지 바 */}
      <View style={styles.messageBar}>
        <View style={styles.editBtnContainer}>
          <EditBtn width={24} height={24} />
        </View>
        <TextInput
          style={styles.messageInput}
          placeholder="메세지를 작성해 주세요."
          placeholderTextColor={colors.white}
          value={message}
          onChangeText={handleInputChange}
          onBlur={handleComplete}
        />
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
      </View>

      {/* 중간 이미지 바 */}
      <View style={styles.imageBar}>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          ) : (
            <EmptyImage width={21} height={21} />
          )}
        </TouchableOpacity>
        <View style={styles.imageTextContainer}>
          <Text style={styles.imageText}>원하시는 이미지를 추가하세요.</Text>
          <TouchableOpacity style={styles.completeButton}>
            <Text style={styles.completeButtonText}>완료</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 태그 리스트 */}
      <View style={styles.tagGrid}>
        {[
          "고생했어",
          "파이팅",
          "오늘 하루도 고생 많았다",
          "힘들었지",
          "아자아자",
          "항상 응원해",
          "고생했어",
        ].map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tagContainer}
            onPress={() => handleTagPress(tag)} // 태그 클릭 이벤트
          >
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addTagButton}>
          <PlusBtn width={24} height={24} />
        </TouchableOpacity>
      </View>

      {/* 하단 바 */}
      <View style={styles.bottomBar}>
        <Text style={styles.sendText}>편지 전달하기</Text>
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
    position: "relative",
  },
  messageBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.blue_gray_55,
    borderRadius: 30,
    width: 353,
    height: 66,
    marginTop: 68,
  },
  editBtnContainer: {
    backgroundColor: colors.blue_lightgray_FF,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
    marginLeft: 15,
  },
  statusContainer: {
    height: 25,
    width: 54,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blue_lightgray_FF,
    borderRadius: 20,
    marginRight: 17,
  },
  statusText: {
    fontSize: 11,
    color: colors.blue_gray_46,
    fontWeight: "700",
  },
  imageBar: {
    backgroundColor: colors.blue_gray_55,
    borderRadius: 30,
    width: 353,
    height: 226,
    marginTop: 15,
    position: "relative",
  },
  imageContainer: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    height: 135,
    width: 334,
    marginTop: 21,
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  imageTextContainer: {
    flexDirection: "row",
  },
  imageText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#CACACA",
    position: "absolute",
    top: 27,
    left: 19,
  },
  completeButton: {
    backgroundColor: colors.light_yellow,
    borderRadius: 20,
    width: 68,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 15,
    left: 275,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.blue_gray_55,
  },
  tagGrid: {
    flexDirection: "row",
    flexWrap: "wrap", // 태그를 여러 줄로 나열
    justifyContent: "flex-start",
    marginTop: 45,
    marginLeft: 8,
    width: "90%", // 적절한 크기 조정
    alignSelf: "center",
    position: "relative",
  },
  tagContainer: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 26,
    height: 38,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 26,
    paddingVertical: 11,
    marginBottom: 7,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
  addTagButton: {
    backgroundColor: colors.white,
    borderRadius: 50,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: -5,
    bottom: 10,
  },
  bottomBar: {
    width: 353,
    height: 48,
    borderRadius: 30,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 645,
  },
  sendText: {
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
