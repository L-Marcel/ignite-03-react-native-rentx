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

import speedSvg from "../../assets/speed.svg";
import accelerationSvg from "../../assets/acceleration.svg";
import forceSvg from "../../assets/force.svg";
import gasolineSvg from "../../assets/gasoline.svg";
import exchangeSvg from "../../assets/exchange.svg";
import peopleSvg from "../../assets/people.svg";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

interface CarDetailsProps {}

export function CarDetails({}: CarDetailsProps) {
  const { navigate } = useNavigation();

  function handleNavigateToScheduling() {
    navigate("Scheduling" as never);
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
        <ImageSlider
          imagesUrl={[
            "https://www.pngarts.com/files/3/White-Audi-PNG-Background-Image.png",
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="300Hm/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={accelerationSvg} />
          <Accessory name="800 HP" icon={forceSvg} />
          <Accessory name="Gasolina" icon={gasolineSvg} />
          <Accessory name="Auto" icon={exchangeSvg} />
          <Accessory name="2 pessoas" icon={peopleSvg} />
        </Accessories>

        <About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça
          Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleNavigateToScheduling} />
      </Footer>
    </Container>
  );
}
