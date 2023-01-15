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
  CalendarIcon,
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
import {
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface SchedulingDetailsProps {}

export function SchedulingDetails({}: SchedulingDetailsProps) {
  const theme = useTheme();
  const { navigate } = useNavigation();

  function handleNavigateToScheduling() {
    navigate("Scheduling" as never);
  }

  function handleNavigateToSchedulingComplete() {
    navigate("SchedulingComplete" as never);
  }

  return (
    <Container>
      <StatusBar translucent style="dark" />
      <Header>
        <BackButton onPress={handleNavigateToScheduling} />
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>02/02/2021</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text} />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>02/03/2021</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceDetails>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
          </RentalPriceDetails>

          <RentalPriceTotal>R$ 1.740,00</RentalPriceTotal>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          color={theme.colors.success}
          title="Alugar agora"
          onPress={handleNavigateToSchedulingComplete}
        />
      </Footer>
    </Container>
  );
}
