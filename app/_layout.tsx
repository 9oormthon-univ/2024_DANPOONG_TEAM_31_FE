import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";

const queryClient = new QueryClient();

export default function RootLayout() {

  // 폰트 로드
  const [fontsLoaded] = useFonts({
    EFDiary: require("@/assets/fonts/EFDiary.ttf"),
    Cafe24SupermagicRegular: require("@/assets/fonts/Cafe24SupermagicRegular.ttf"),
    JNEYunaRegular: require("@/assets/fonts/JNEYunaRegular.ttf"),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: styles.screenContent,
              statusBarTranslucent: true,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </SafeAreaProvider>
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  screenContent: {
    flex: 1,
  },
});
