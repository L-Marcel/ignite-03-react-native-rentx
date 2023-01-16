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
import { Alert, View } from "react-native";
import { Button } from "../../components/Button";
import { Content, Footer } from "./styles";
import { Calendar, MarkedDateProps } from "../../components/Calendar/index";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarType } from "../../components/Car/index";
import { DateData } from "react-native-calendars";
import { useState } from "react";
import { generateInterval } from "../../components/Calendar/generateInterval";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { format } from "date-fns";

interface SchedulingProps {}

export interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export function Scheduling({}: SchedulingProps) {
  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>({} as DateData);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({});

  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as {
    car: CarType;
  };

  const { navigate } = useNavigation();

  function handleNavigateToCarDetails() {
    navigate(
      "CarDetails" as never,
      {
        car,
      } as never
    );
  }

  function handleNavigateToScheduling() {
    navigate(
      "SchedulingDetails" as never,
      {
        car,
        dates: Object.keys(markedDates),
      } as never
    );
  }

  function handleChangeDate(date: DateData) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const intervals = Object.keys(interval);
    const firstDate = intervals[0];
    const endDate = intervals[intervals.length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), "dd/MM/yyyy"),
      endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
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
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>
          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          enabled={!!rentalPeriod.startFormatted && !!rentalPeriod.endFormatted}
          title="Confirmar"
          onPress={handleNavigateToScheduling}
        />
      </Footer>
    </Container>
  );
}
