import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import EditBtn from "@/assets/images/icons/black_edit_btn.svg";
import Image from "@/assets/images/icons/image.svg";
import PlusBtn from "@/assets/images/icons/black_plus_btn.svg";
import EnterButton from "@/assets/images/icons/darkblue_enter.svg";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";

export default function TextMessage() {

    return (
        <View style={styles.container}>
            {/* 상단 메제지 바 */}
            <View style={styles.messageBar}>
                <View style={styles.EditBtnContainer}>
                    <EditBtn width={24} height={24} />
                </View>
                <Text style={styles.editText}>메세지를 작성해 주세요.</Text>
            </View>

            {/* 중간 이미지 바 */}
            <View style={styles.imageBar}>
                <View style={styles.imageContainer}>
                    <Image width={21} height={21}/>
                </View>
                <Text style={styles.imageText}>원하시는 이미지를 추가하세요.</Text>
            </View>

            {/* 하단 바 */}
            <View style={styles.bottomBar}>
                <View style={styles.exTextContainer}>

                </View>
                <Text style={styles.sendText}>편지 전달하기</Text>
                <TouchableOpacity style={styles.enterButton}>
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
    messageBar: {
        backgroundColor: colors.blue_gray_55,
    },
    EditBtnContainer: {
        backgroundColor: colors.blue_lightgray_FF,
        borderRadius: "50%",
    },
    editText: {
        fontWeight: '700',
        color: colors.white,
        fontSize: 16,
    },
    imageBar: {
        backgroundColor: colors.blue_gray_55,
    },
    imageContainer: {
        backgroundColor: "F5F5F5",
    },
    imageText: {
        fontWeight: '400',
        fontSize: 16,
        color: "CACACA",
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
    exTextContainer: {

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
