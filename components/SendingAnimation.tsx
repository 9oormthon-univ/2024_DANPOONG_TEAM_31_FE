import { Image, StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";

import LoadingWhale from "@/assets/images/icons/loadingWhale.gif";
import YellowCheck from "@/assets/images/icons/yellow_check.svg";
import HeaderBar from "@/components/header_bar";

import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, usePathname, useRouter } from "expo-router";

/**
 * 전송중 컴포넌트
 * @param {object} props props
 * @param {string} props.sendingMessage 고래 바로 밑에 뜨는 첫번째 메시지
 * @param {string} props.doneMessage1 완료 후 뜨는 가장 큰 첫번째 메시지
 * @param {string} props.doneMessage2 완료 후 뜨는 가장 큰 두번째 메시지
 * @param {string} props.doneExtraMessage 완료 후 뜨는 작은 응원의 메시지
 */
export const SendingAnimation = ({
  sendingMessage,
  doneMessage1,
  doneMessage2,
  doneExtraMessage,
  headerbarMessage1,
  headerbarMessage2,
}: {
  sendingMessage: string;
  doneMessage1: string;
  doneMessage2: string;
  doneExtraMessage: string;
  headerbarMessage1: string;
  headerbarMessage2: string;
}) => {
  const router = useRouter();

  const SendingComponent = () => {
    return (
      <View style={sendingStyles.container}>
        <HeaderBar title={headerbarMessage1} />
        <View style={sendingStyles.mainContainer}>
          <Image source={LoadingWhale} style={sendingStyles.loadingImage} />
          <Text style={sendingStyles.loadingText}>{sendingMessage}</Text>
        </View>
      </View>
    );
  };

  const DoneComponent = () => {
    return (
      <View style={doneStyles.container}>
        <HeaderBar title={headerbarMessage2} />
        <View style={doneStyles.mainContainer}>
          <YellowCheck width={43.5} height={43.5} style={doneStyles.icon} />
          <Text style={doneStyles.mainText}>{doneMessage1}</Text>
          <Text style={doneStyles.mainText2}>{doneMessage2}</Text>
          <Text style={doneStyles.subText}>{doneExtraMessage}</Text>
        </View>
      </View>
    );
  };

  const [index, setIndex] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let timer: NodeJS.Timeout;

      switch (index) {
        case 0:
          // 전송중 화면 2초 후 완료 화면으로 이동

          timer = setTimeout(() => {
            setIndex(1);
          }, 2000);

          return () => {
            clearTimeout(timer);
          };
        case 1:
          // 완료 화면 3초 후 홈 화면으로 이동

          timer = setTimeout(() => {
            router.dismissAll(); // push 스택 다 지움
            router.replace("/home"); // 홈으로
          }, 3000);

          return () => {
            clearTimeout(timer);
          };
      }
    }, [index])
  );

  switch (index) {
    default:
    case 0:
      return <SendingComponent />;

    case 1:
      return <DoneComponent />;
  }
};

const sendingStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  mainContainer: {
    marginTop: 230,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingImage: {
    width: 102.25,
    height: 128,
    resizeMode: "contain", // 이미지 크기 유지하면서 화면에 맞춤
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});

const doneStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  mainContainer: {
    marginTop: 198,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {},
  mainText: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.white,
    textAlign: "center",
    marginTop: 27.25,
    height: 34,
  },
  mainText2: {
    fontSize: 24,
    fontWeight: "400",
    color: colors.white,
    textAlign: "center",
    marginTop: 4,
    height: 34,
  },
  subText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.white,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 20,
  },
});
