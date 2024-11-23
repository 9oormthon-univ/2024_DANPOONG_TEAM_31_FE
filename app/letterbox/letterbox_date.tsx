import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Animated,
} from "react-native";
import XBtn from "@/assets/images/icons/x_light.svg";
import XBtnBack from "@/assets/images/icons/modal_x_back.svg";
import EmptyHeart from "@/assets/images/icons/empty_heart.svg";
import FillHeart from "@/assets/images/icons/fill_heart.svg";
import RightArrow from "@/assets/images/icons/right_arrow.svg";
import LeftArrow from "@/assets/images/icons/left_arrow.svg";
import colors from "@/constants/colors";
import { BlurView } from 'expo-blur';
import { useRouter } from "expo-router";

interface Message {
    id: number;
    type: string;
    date: string;
    sender: string;
    liked: boolean;
}

interface LetterboxDateProps {
    visible: boolean;
    onClose: () => void;
}

export default function LetterboxDate({ visible, onClose }: LetterboxDateProps) {
    const [page, setPage] = useState(1); // 현재 페이지
    const [popupVisible, setPopupVisible] = useState(false); // 팝업 상태
    const fadeAnim = new Animated.Value(1); // 팝업 애니메이션
    const router = useRouter();


    // 메시지 데이터
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, type: "편지", date: "24.11.06", sender: "김현서", liked: false },
        { id: 2, type: "음성", date: "24.11.06", sender: "허윤호", liked: false },
        { id: 3, type: "편지", date: "24.11.06", sender: "허윤호", liked: false },
        { id: 4, type: "음성", date: "24.11.06", sender: "서현은", liked: false },
        { id: 5, type: "편지", date: "24.11.06", sender: "허윤호", liked: false },
        { id: 6, type: "음성", date: "24.11.06", sender: "서현은", liked: false },
    ]);

    const ITEMS_PER_PAGE = 5; // 한 페이지에 표시할 메시지 개수
    const totalPages = Math.ceil(messages.length / ITEMS_PER_PAGE); // 총 페이지 수

    // 페이지 변경 핸들러
    const handlePageChange = (direction: "prev" | "next") => {
        if (direction === "next") {
            if (page === totalPages) {
                // 페이지 끝일 경우 팝업 표시
                showPopup();
            } else {
                setPage((prev) => prev + 1);
            }
        } else if (direction === "prev" && page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    // 팝업 표시 로직
    const showPopup = () => {
        setPopupVisible(true);
        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                setPopupVisible(false);
                fadeAnim.setValue(1); // 상태 초기화
            });
        }, 2000);
    };

    // 좋아요 토글 함수
    const toggleLike = (id: number) => {
        setMessages((prevMessages) =>
            prevMessages.map((message) =>
                message.id === id ? { ...message, liked: !message.liked } : message
            )
        );
    };

    // 현재 페이지의 메시지 데이터 가져오기
    const getCurrentPageMessages = () => {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        return messages.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    };

    // 모달이 닫힐 때 페이지 초기화
    useEffect(() => {
        if (!visible) setPage(1);
    }, [visible]);

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <BlurView
                style={styles.modalOverlay}
                intensity={10}
                tint="dark"
            >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {/* 닫기 버튼 */}
                    <View style={styles.closeButton}>
                        <TouchableOpacity onPress={onClose}>
                            <XBtnBack width={97} height={62} />
                            <XBtn width={24} height={24} style={styles.closeText} />
                        </TouchableOpacity>
                    </View>

                    {/* 메시지 리스트 */}
                    <View style={styles.messageContainer}>
                        <View style={styles.messageList}>
                            {getCurrentPageMessages().map((message) => (
                                <View key={message.id} style={styles.messageItem}>
                                    <View style={styles.messageProfil}></View>
                                    <View style={styles.messageTextContainer}>
                                        <Text style={styles.messageTitle}>{message.type}</Text>
                                        <Text style={styles.messageDate}>
                                            {message.date}   {message.sender}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => toggleLike(message.id)}
                                        style={styles.messageHeart}
                                    >
                                        {message.liked ? (
                                            <FillHeart width={18} height={18} />
                                        ) : (
                                            <EmptyHeart width={18} height={18} />
                                        )}
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <RightArrow width={4.14} height={8.3} style={styles.messageArrow}/>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>

                        {/* 페이지 네비게이션 */}
                        <View style={styles.paginationContainer}>
                            <TouchableOpacity onPress={() => handlePageChange("prev")}>
                                <LeftArrow width={11} height={11} />
                            </TouchableOpacity>
                            <Text style={styles.pageNumber}>p.{page}</Text>
                            <TouchableOpacity onPress={() => handlePageChange("next")}>
                                <RightArrow width={11} height={11} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* 팝업 */}
                {popupVisible && (
                    <Animated.View style={[styles.popupContainer, { opacity: fadeAnim }]}>
                        <Text style={styles.popupText}>더 이상 넘길 페이지가 없습니다.</Text>
                    </Animated.View>
                )}
            </View>
            </BlurView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,        
    },
    modalOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%", 
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
    },
    closeButton: {
        position: "absolute",
        top: 113,
        left: -20,
    },
    closeText: { 
        position: "absolute",
        top: 19,
        left: 47,
        shadowColor: colors.white, // 흰색 그림자
        shadowOffset: { width: 0, height: 0 }, // 그림자 위치
        shadowOpacity: 1, // 그림자 투명도
        shadowRadius: 2, // 그림자 블러 크기
        elevation: 5, // Android 그림자
    },
    messageContainer: {
        width: 353,
        height: 526,
        backgroundColor: colors.blue_gray_76,
        borderRadius: 33.37,
        alignSelf: "center",
        marginTop: 191,
        position: "relative",
    },
    messageList: { 
        marginTop: 16.59,
    },
    messageItem: { 
        width: 324.5,
        height: 60.84, 
        backgroundColor: colors.blue_gray_55, 
        borderRadius: 26.35, 
        marginBottom: 9.22,
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        position: "relative",
    },
    messageProfil: {
        backgroundColor: "#E8ECFF",
        width: 36,
        height: 36,
        borderRadius: 18,
        marginLeft: 9.19,
    },
    messageTextContainer: {
        marginLeft: 11.03,
    },
    messageTitle: { 
        fontSize: 14.05,
        fontWeight: '700', 
        color: colors.white, 
        marginBottom: 2,
    },
    messageDate: { 
        fontSize: 11.42, 
        color: colors.white,
        fontWeight: 400, 
    },
    messageHeart: {
        position: "absolute",
        right: 33.09,
    },
    messageArrow: {
        position: "absolute",
        right: 9.65,
    },
    paginationContainer: { 
        position: "absolute",
        bottom: 27.91,
        alignSelf: "center",
        backgroundColor: "rgba(21, 30, 70, 0.5)",
        width: 117.67,
        height: 46.09,
        borderRadius: 26.35,
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center",
        shadowColor: colors.white, // 흰색 그림자
        shadowOffset: { width: 0, height: 0 }, // 그림자 위치
        shadowOpacity: 0.3, // 그림자 투명도
        shadowRadius: 6, // 그림자 블러 크기
        elevation: 5, // Android 그림자
    },
    pageNumber: { 
        fontSize: 10.54, 
        color: colors.white, 
        marginHorizontal: 22.12,
        fontWeight: '700',
    },
    popupContainer: {
        position: "absolute",
        bottom: 233,
        alignSelf: "center",
        backgroundColor: colors.blue_gray_46,
        width: 227,
        height: 42,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    popupText: { 
        color: colors.white, 
        fontSize: 13,
        fontWeight: '400', 
    },
});
