import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton,
} from "./styles";
import { StatusBar } from "expo-status-bar";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car, CarType } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { api } from "../../services/api";
import { useRefreshOnFocus } from "../../context/hooks/useRefreshOnFocus";
import { Load } from "../../components/Load/index";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { BackHandler, View } from "react-native";
import { useEffect } from "react";
import { LoadAnimation } from "../../components/LoadAnimation/index";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

const ButtonAnimated = Animated.createAnimatedComponent(MyCarsButton);

interface HomeProps {}

export function Home({}: HomeProps) {
  const theme = useTheme();
  const { navigate } = useNavigation();
  const {
    data: cars,
    refetch,
    isFetching,
  } = useQuery(
    "cars",
    async () => {
      return await api.get<CarType[]>("/cars").then((res) => {
        return res.data;
      });
    },
    {
      initialData: [],
      refetchOnMount: true,
    }
  );

  useRefreshOnFocus(refetch);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: positionX.value,
        },
        {
          translateY: positionY.value,
        },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  function handleNavigateToCarDetails(car: CarType) {
    navigate(
      "CarDetails" as never,
      {
        car,
      } as never
    );
  }

  function handleOpenMyCars() {
    navigate("MyCars" as never);
  }

  const numberOfCars = cars.length;

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  return (
    <Container>
      <StatusBar translucent style="light" />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {isFetching ? (
            <TotalCars>Carregando...</TotalCars>
          ) : (
            <TotalCars>Total de {numberOfCars} carros</TotalCars>
          )}
        </HeaderContent>
      </Header>
      {isFetching ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <LoadAnimation duration={200} />
        </View>
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item: CarType) => {
            return item.id;
          }}
          renderItem={({ item: car }) => {
            return (
              <Car
                onPress={() => {
                  handleNavigateToCarDetails(car as CarType);
                }}
                data={car as CarType}
              />
            );
          }}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated onPress={handleOpenMyCars}>
            <Ionicons color={theme.colors.shape} size={32} name="ios-car-sport" />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}
