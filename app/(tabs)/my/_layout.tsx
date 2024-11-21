import { Slot, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function MyLayout() {
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
          <Stack.Screen name="account" />
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
