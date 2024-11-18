import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import YellowCheck from "@/assets/images/icons/yellow_check.svg";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";

export default function LetterConfirm(){
    return (
        <View style={styles.container}>
            <YellowCheck width={43.5} height={43.5} style={styles.icon} />
            <Text style={styles.mainText}>000님의 따뜻한 한마디가</Text>
            <Text style={styles.mainText2}>000님에게 전달되었어요!</Text>
            <Text style={styles.subText}>
                00님에게 큰 힘이 되어줄거예요.{"\n"}다음에도 찾아와주세요.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        
    },
    mainText: {
        fontSize: 24,
        fontWeight: "600",
        color: colors.white,
        textAlign: "center",
        marginTop: 27.25,
        height: 34,
    },
    mainText2: {
        fontSize: 24,
        fontWeight: "400",
        color: colors.white,
        textAlign: "center",
        marginTop: 4,
        height: 34,
    },
    subText: {
        fontSize: 14,
        fontWeight: "400",
        color: colors.white,
        textAlign: "center",
        marginTop: 20,
        lineHeight: 20,
    },
});