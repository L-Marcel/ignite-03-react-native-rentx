import { StatusBar } from "expo-status-bar";
import { BackButton } from "../../components/BackButton";
import {
  CarImages,
  Container,
  Header,
  Content,
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
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory/index";

import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarType } from "../../components/Car/index";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

interface CarDetailsProps {}

export function CarDetails({}: CarDetailsProps) {
  const { navigate } = useNavigation();
  const route = useRoute();
  const { car } = route.params as {
    car: CarType;
  };

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
      <Header>
        <BackButton onPress={handleNavigateToHome} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
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
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleNavigateToScheduling} />
      </Footer>
    </Container>
  );
}
