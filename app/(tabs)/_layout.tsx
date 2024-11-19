import { Tabs, usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Member from "@/assets/images/icons/member.svg";
import Schedule from "@/assets/images/icons/schedule.svg";
import Home from "@/assets/images/icons/home.svg";
import Letter from "@/assets/images/icons/letter.svg";
import My from "@/assets/images/icons/my.svg";
import BackgroundImg from "@/assets/images/background.svg";

import colors from "@/constants/colors";
import { ReactNode } from "react";

const TabComponent = ({
  focused,
  label,
  icon,
}: {
  focused: boolean;
  icon: ReactNode;
  label?: string;
}) => (
  <View style={styles.iconWrapper}>
    {icon}
    {label && (
      <Text
        style={[
          styles.label,
          {
            ...(focused
              ? {
                  textShadowColor: colors.white,
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 5,
                }
              : {}),
          },
        ]}
      >
        {label}
      </Text>
    )}
  </View>
);

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <BackgroundImg width="100%" height="100%" style={styles.background} />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "left"]}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: undefined,
            tabBarActiveTintColor: undefined,
            tabBarStyle: {
              backgroundColor: "transparent",
              borderTopWidth: 0,
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              elevation: 0,
            },
            sceneStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabComponent
                focused={focused}
                icon={
                  <View
                    style={{
                      width: 52,
                      height: 52,
                      flexShrink: 0,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: colors.blue_gray_46,
                      borderRadius: 999,
                    }}
                  >
                    <Home style={focused ? styles.dropShadow : undefined} />
                  </View>
                }
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              if (pathname !== "/home") {
                router.navigate("/(tabs)/home");
              } else {
                console.log("d");
              }
            },
          }}
        />
        <Tabs.Screen
          name="letter"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabComponent
                focused={focused}
                label="편지"
                icon={<Letter style={focused ? styles.dropShadow : undefined} />}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="my"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabComponent
                focused={focused}
                label="마이"
                icon={<My style={focused ? styles.dropShadow : undefined} />}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconWrapper: {
    alignItems: "center",
    gap: 8,
  },
  label: {
    color: colors.white,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16.768,
    letterSpacing: -0.3,
  },
  dropShadow: {
    shadowColor: colors.white, // Shadow color
    shadowOffset: { width: 0, height: 0 }, // Shadow offset
    shadowOpacity: 1, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
    elevation: 5, // Required for Android shadow
  },
});
