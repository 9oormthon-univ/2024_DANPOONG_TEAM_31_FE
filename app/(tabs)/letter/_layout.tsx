import { LetterContext, LetterContextData } from "@/contexts/LetterContext";
import { Slot, Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function LetterLayout() {
  const [letter, setLetter] = useState<LetterContextData>({ receiverId: null, textContent: null });

  return (
    <LetterContext.Provider
      value={[
        letter,
        (data: Partial<LetterContextData>) => setLetter((prev) => ({ ...prev, ...data })),
      ]}
    >
      <Slot>
        <View style={styles.container}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: styles.screenContent,
              statusBarTranslucent: true,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="select" />
            <Stack.Screen name="sending_letter" />
            <Stack.Screen name="text_message" />
            <Stack.Screen name="voice_message" />
          </Stack>
        </View>
      </Slot>
    </LetterContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  screenContent: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
