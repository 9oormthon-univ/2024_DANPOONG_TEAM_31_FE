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
import { useMemoStore } from "@/stores/memoStore";
import { useState } from "react";

import ChevronRight from "@/assets/images/icons/black_chevron-right.svg";
import DarkblueEnter from "@/assets/images/icons/darkblue_enter.svg";
import { useRouter } from "expo-router";

export const EnterMemo = () => {
  const router = useRouter();

  const { type } = useMemoStore();

  const [input, setInput] = useState("");

  const send = ({ type, value }: { type: "emoji" | "message"; value?: string }): void => {
    if (type === "emoji") {
      // 기분 전송
      console.log(value);
    } else if (type === "message") {
      // 메모 전송
      console.log(input);
    }
    router.push("/home/sending_memo");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {type === "mood" && "지금 기분이 어떠세요?"}
          {type === "message" && "지금 고민을 이야기해주세요."}
        </Text>
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
              <Pressable onPress={() => send({ type: "emoji", value: entry.name })}>
                <Text style={styles.emoji}>{entry.emoji}</Text>
              </Pressable>
              <TouchableOpacity
                style={styles.emojiChip}
                onPress={() => send({ type: "emoji", value: entry.name })}
              >
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
            placeholder="작성해주세요."
            placeholderTextColor={colors.blue_gray_46}
          />
          <TouchableOpacity style={styles.enterIcon} onPress={() => send({ type: "message" })}>
            <DarkblueEnter />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginVertical: 30,
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
