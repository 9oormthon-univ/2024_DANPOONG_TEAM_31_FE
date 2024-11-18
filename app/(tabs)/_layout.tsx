import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Member from "@/assets/images/icons/my.svg";
import Schedule from "@/assets/images/icons/schedule.svg";
import Home from "@/assets/images/icons/home.svg";
import Letter from "@/assets/images/icons/letter.svg";
import My from "@/assets/images/icons/my.svg";

import Member_Focused from "@/assets/images/icons/my_focused.svg";
import Schedule_Focused from "@/assets/images/icons/schedule_focused.svg";
import Home_Focused from "@/assets/images/icons/home_focused.svg";
import Letter_Focused from "@/assets/images/icons/letter_focused.svg";
import My_Focused from "@/assets/images/icons/my_focused.svg";
import colors from "@/constants/colors";
import { ReactNode } from "react";

const TabComponent = ({
  focused,
  label,
  defaultIcon,
  focusedIcon,
}: {
  focused: boolean;
  label: string;
  defaultIcon: ReactNode;
  focusedIcon: ReactNode;
}) => (
  <View style={styles.iconWrapper}>
    {focused ? focusedIcon : defaultIcon}
    <Text
      style={[
        styles.label,
        {
          ...(focused
            ? {
                textShadowColor: "#FFF",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 5,
              }
            : {}),
        },
      ]}
    >
      {label}
    </Text>
  </View>
);

export default function TabLayout() {
  return (
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
            backgroundColor: "#211f44",
          },
        }}
      >
        <Tabs.Screen
          name="member"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabComponent
                focused={focused}
                label="멤버"
                defaultIcon={<Member />}
                focusedIcon={<Member_Focused />}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="schedule"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabComponent
                focused={focused}
                label="일정"
                defaultIcon={<Schedule />}
                focusedIcon={<Schedule_Focused />}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabComponent
                focused={focused}
                label="홈"
                defaultIcon={<Home />}
                focusedIcon={<Home_Focused />}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="letter"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabComponent
                focused={focused}
                label="편지"
                defaultIcon={<Letter />}
                focusedIcon={<Letter_Focused />}
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
                defaultIcon={<My />}
                focusedIcon={<My_Focused />}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  label: {
    color: colors.white,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: -0.3,
  },
});
