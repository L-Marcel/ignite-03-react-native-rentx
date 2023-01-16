import { StatusBar } from "expo-status-bar";
import { BackButton } from "../../components/BackButton";
import {
  CarImages,
  Container,
  Header,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from "./styles";

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory/index";

import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarType } from "../../components/Car/index";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";

interface CarDetailsProps {}

export function CarDetails({}: CarDetailsProps) {
  const { navigate } = useNavigation();
  const route = useRoute();
  const theme = useTheme();
  const { car } = route.params as {
    car: CarType;
  };

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    console.log(event.contentOffset.y);
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleNavigateToScheduling() {
    navigate(
      "Scheduling" as never,
      {
        car,
      } as never
    );
  }

  function handleNavigateToHome() {
    navigate("Home" as never);
  }

  return (
    <Container>
      <StatusBar translucent style="dark" />
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          {
            backgroundColor: theme.colors.backgroundSecondary,
          },
        ]}
      >
        <Header>
          <BackButton onPress={handleNavigateToHome} />
        </Header>

        <CarImages style={sliderCarsStyleAnimation}>
          <ImageSlider imagesUrl={car.photos} />
        </CarImages>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 200,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={15}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(({ name, type }) => {
            return <Accessory key={type} name={name} icon={getAccessoryIcon(type)} />;
          })}
        </Accessories>

        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleNavigateToScheduling}
        />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
});
