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
          <Stack.Screen name="add_schedule" />
          <Stack.Screen name="ckeck_schedule" />
          <Stack.Screen name="schedule_confirm" />
          <Stack.Screen name="sending_schedule" />
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
