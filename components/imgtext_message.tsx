import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import colors from "@/constants/colors";

import Star from "@/assets/images/icons/letter_star.svg";
import EmptyHeart from "@/assets/images/icons/empty_heart.svg";
import FillHeart from "@/assets/images/icons/fill_heart.svg";
import EmptyImage from "@/assets/images/icons/white_image.svg";
import XBtn from "@/assets/images/icons/x_light.svg";
import XBtnBack from "@/assets/images/icons/modal_x_back.svg";

export default function AudioMessage() {
  return (
    <View style={styles.container}>
      {/* Modal */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
            {/* 모달 닫기 */}
            <TouchableOpacity style={styles.closeButton}>
                <XBtnBack width={24} height={24}/>
                <XBtn width={24} height={24} />
            </TouchableOpacity>

            <View style={styles.modalContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Heart width={24} height={24} />
                    <View style={styles.devide}></View>
                </View>

                {/* Content */}
                <View style={styles.body}>
                    <Text>To. 거북이</Text>
                    <EmptyHeart width={24} height={24}/>
                    <PlayBtn width={24} height={24} />
                    <Text>From. 토끼</Text>
                </View>

                <View style={styles.footer}>
                    <Text>보관하기</Text>
                </View>
          </View>
        </View>
      </Modal>
    </View>
  );
  
}

const styles = StyleSheet.create({
  
   
});