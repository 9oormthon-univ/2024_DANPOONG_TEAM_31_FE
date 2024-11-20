import { Slot, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function HomeLayout() {
  return (
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
