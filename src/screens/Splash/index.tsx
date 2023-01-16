import { StatusBar } from "expo-status-bar";
import { Container } from "./styles";

import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LoadAnimation } from "../../components/LoadAnimation";

interface SplashProps {}

export function Splash({}: SplashProps) {
  const navigation = useNavigation();

  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
      position: "absolute",
    };
  });

  const logoStyle = useAnimatedStyle(() => {
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

  function startApp() {
    navigation.navigate("Home" as never);
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      {
        duration: 2000,
      },
      () => {
        "worklet";
        runOnJS(startApp)();
      }
    );
  }, []);

  return (
    <Container>
      <StatusBar style="light" />
      <Animated.View style={brandStyle}>
        <BrandSvg width={80} height={50} />
      </Animated.View>
      <Animated.View style={logoStyle}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
      <LoadAnimation marginTop={85} />
    </Container>
  );
}
