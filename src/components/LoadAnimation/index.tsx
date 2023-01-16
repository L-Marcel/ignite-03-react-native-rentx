import AnimatedLottieView from "lottie-react-native";
import { Container } from "./styles";

import loadAnimation from "../../assets/load-animation.json";
import { ViewProps } from "react-native";
import { useEffect } from "react";
import {
  Extrapolate,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface LoadAnimationProps extends ViewProps {
  duration?: number;
  marginTop?: number;
}

export function LoadAnimation({
  duration = 2000,
  marginTop = 0,
  ...rest
}: LoadAnimationProps) {
  const splashAnimation = useSharedValue(0);

  const carStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
      position: "absolute",
    };
  });

  useEffect(() => {
    splashAnimation.value = withTiming(50, {
      duration,
    });
  }, [duration]);

  return (
    <Container style={carStyle} {...rest}>
      <AnimatedLottieView
        resizeMode="contain"
        loop
        autoPlay
        source={loadAnimation}
        style={{
          height: 200,
          marginTop,
        }}
      />
    </Container>
  );
}
