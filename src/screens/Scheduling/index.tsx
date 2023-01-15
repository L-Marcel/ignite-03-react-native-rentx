import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
} from "./styles";
import { StatusBar } from "expo-status-bar";
import { BackButton } from "../../components/BackButton/index";
import { useTheme } from "styled-components/native";

import ArrowSvg from "../../assets/arrow.svg";
import { View } from "react-native";
import { Button } from "../../components/Button";
import { Content, Footer } from "./styles";
import { Calendar } from "../../components/Calendar/index";
import { useNavigation } from "@react-navigation/native";

interface SchedulingProps {}

export function Scheduling({}: SchedulingProps) {
  const theme = useTheme();

  const { navigate } = useNavigation();

  function handleNavigateToCarDetails() {
    navigate("CarDetails" as never);
  }

  function handleNavigateToScheduling() {
    navigate("SchedulingDetails" as never);
  }

  return (
    <Container>
      <StatusBar translucent style="light" />
      <Header>
        <View style={{ alignSelf: "flex-start" }}>
          <BackButton onPress={handleNavigateToCarDetails} color={theme.colors.shape} />
        </View>

        <Title>
          Escolha uma{"\n"}
          data de início e {"\n"}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected>18/06/2021</DateValue>
          </DateInfo>
          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}></DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleNavigateToScheduling} />
      </Footer>
    </Container>
  );
}
