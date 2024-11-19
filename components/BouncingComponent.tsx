import React, { ReactNode, useEffect, useRef } from "react";
import { Animated } from "react-native";

const BouncingComponent = ({
  children,
  timingIndex,
}: {
  children: ReactNode;
  timingIndex: number;
}) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 5000,
        easing: (t) => Math.sin((t + Math.PI + (Math.PI / 2) * timingIndex) * 2 * Math.PI),
        useNativeDriver: true,
      }),
      { iterations: -1 }
    ).start();
  }, []);

  const animatedStyle = {
    transform: [
      {
        translateY: bounceAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
  };

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default BouncingComponent;
