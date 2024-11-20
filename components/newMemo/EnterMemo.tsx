import colors from "@/constants/colors";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMemoStore } from "@/stores/memo";
import { useState } from "react";

import ChevronRight from "@/assets/images/icons/black_chevron-right.svg";
import DarkblueEnter from "@/assets/images/icons/darkblue_enter.svg";

export const EnterMemo = () => {
  const { type, setMemo } = useMemoStore();

  const setEmoji = (emojiName: string) => {
    setMemo({ mood: emojiName, type: "message" });
  };

  const [input, setInput] = useState("");

  const send = () => {
    if (input.trim().length === 0) return alert("내용을 입력해주세요.");
    setMemo({ message: input });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {type === "mood" && "지금 기분이 어떠세요?"}
          {type === "message" && "지금 고민을 이야기해주세요."}
        </Text>
        <Pressable>
          <ChevronRight style={{ marginRight: 16 }} />
        </Pressable>
      </View>

      {type === "mood" && (
        <ScrollView horizontal={true} contentContainerStyle={styles.emojiContainer}>
          {[
            { emoji: "🙂", name: "행복" },
            { emoji: "😗", name: "기쁨" },
            { emoji: "🥲", name: "슬픈" },
            { emoji: "😐", name: "긴장" },
            { emoji: "😡", name: "화남" },
            { emoji: "🥰", name: "감동" },
            { emoji: "🫨", name: "놀람" },
          ].map((entry) => (
            <View key={entry.name} style={styles.emojiWrapper}>
              <Pressable onPress={() => setEmoji(entry.name)}>
                <Text style={styles.emoji}>{entry.emoji}</Text>
              </Pressable>
              <TouchableOpacity style={styles.emojiChip} onPress={() => setEmoji(entry.name)}>
                <Text style={styles.emojiChipLabel}>{entry.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {type === "message" && (
        <View style={styles.messageContainer}>
          <TextInput
            style={styles.messageInput}
            onChangeText={(text) => setInput(text)}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.enterIcon} onPress={() => send()}>
            <DarkblueEnter />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: "100%",
    marginBottom: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    overflow: "hidden",
  },
  header: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    marginLeft: 33,
    color: colors.blue_gray_46,
    fontSize: 16,
    fontWeight: "700",
  },
  emojiContainer: {
    marginLeft: 27,
    marginBottom: 8,
    paddingTop: 10,
    paddingBottom: 8,
    alignItems: "center",
    gap: 12,
  },
  emojiWrapper: {
    alignItems: "center",
    gap: 9.5,
  },
  emoji: {
    fontSize: 40.2,
  },
  emojiChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E4E4E4",
    backgroundColor: "#F5F5F5",
  },
  emojiChipLabel: {
    color: "#9D9D9D",
    fontSize: 16,
    fontWeight: "500",
  },
  messageContainer: {
    position: "relative",
    height: 48,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: colors.white,
  },
  messageInput: {
    width: 260,
    marginLeft: 24,
    marginVertical: 15,
  },
  enterIcon: {
    position: "absolute",
    top: -2,
    right: 0,
  },
});
