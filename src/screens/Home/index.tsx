import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";
import { StatusBar } from "expo-status-bar";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car, CarType } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";

interface HomeProps {}

export function Home({}: HomeProps) {
  const { navigate } = useNavigation();

  function handleNavigateToCarDetails() {
    navigate("CarDetails" as never);
  }

  const car: CarType = {
    brand: "audi",
    id: "2",
    name: "RS 5 Coupé",
    rent: {
      period: "Ao dia",
      price: 120,
    },
    thumbnail: "https://www.pngmart.com/files/1/Audi.png",
  };

  return (
    <Container>
      <StatusBar translucent style="light" />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      <CarList
        data={[
          car,
          {
            ...car,
            id: "1",
            thumbnail:
              "https://www.pngarts.com/files/3/White-Audi-PNG-Background-Image.png",
          },
        ]}
        keyExtractor={(item: CarType) => {
          return item.id;
        }}
        renderItem={({ item: car }) => {
          return <Car onPress={handleNavigateToCarDetails} data={car as CarType} />;
        }}
      />
    </Container>
  );
}
