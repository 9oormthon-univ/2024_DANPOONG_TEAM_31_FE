import React, { useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import LoadingWhale from "@/assets/images/icons/loadingWhale.gif";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";

export default function SendingLetter() {
    const router = useRouter();

    useEffect(() => {
        // 5초 후 LetterConfirm 화면으로 이동
        const timer = setTimeout(() => {
            router.replace("/letter/letter_confirm");
        }, 5000);

        // 컴포넌트 언마운트 시 타이머 정리
        return () => clearTimeout(timer);
    }, [router]);
    
    return (
        <View style={styles.container}>
            <Image source={LoadingWhale} style={styles.loadingImage} />
            <Text style={styles.loadingText}>편지 전달중</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingImage: {
        width: 102.25,
        height: 128,
        resizeMode: "contain", // 이미지 크기 유지하면서 화면에 맞춤
    },
    loadingText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.white,
    },
});
