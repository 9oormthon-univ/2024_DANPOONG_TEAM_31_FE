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
          <Stack.Screen name="home" />
          <Stack.Screen name="sending_memo" />
          <Stack.Screen name="settings" />
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
