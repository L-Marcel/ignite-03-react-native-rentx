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

  return (
    <Container>
      <StatusBar translucent style="light" />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      {isFetching ? (
        <Load />
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

      <MyCarsButton>
        <Ionicons
          onPress={handleOpenMyCars}
          color={theme.colors.shape}
          size={32}
          name="ios-car-sport"
        />
      </MyCarsButton>
    </Container>
  );
}
