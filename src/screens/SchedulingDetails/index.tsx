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
  Accessories,
  Footer,
  CalendarIcon,
} from "./styles";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory/index";

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
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarType } from "../../components/Car/index";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { api } from "../../services/api";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { Alert } from "react-native";
import { useState } from "react";

export type UserSchedule = {
  id?: number;
  user_id: number;
  car: CarType;
  startDate: string;
  endDate: string;
};

interface SchedulingDetailsProps {}

export function SchedulingDetails({}: SchedulingDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const { navigate } = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as {
    car: CarType;
    dates: string[];
  };

  const numberOfDatesInInterval = dates.length;
  const formattedStartDate = format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy");
  const formattedEndDate = format(
    getPlatformDate(new Date(dates[dates.length - 1])),
    "dd/MM/yyyy"
  );

  function handleNavigateToScheduling() {
    navigate(
      "Scheduling" as never,
      {
        car,
      } as never
    );
  }

  async function handleConfirmRental() {
    setIsLoading(true);

    const schedulesByCar = await api
      .get(`/schedules_bycars/${car.id}`)
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        setIsLoading(false);
        Alert.alert("Não foi possível confirmar o agendamento.");
      });

    const unavailableDates = [...schedulesByCar.unavailable_dates, ...dates];

    api
      .post("/schedules_byuser", {
        user_id: 1,
        car,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      } as UserSchedule)
      .catch(() => {
        setIsLoading(false);
        Alert.alert("Não foi possível confirmar o agendamento.");
      });

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates: unavailableDates,
      })
      .then(() => {
        navigate("SchedulingComplete" as never);
      })
      .catch(() => {
        setIsLoading(false);
        Alert.alert("Não foi possível confirmar o agendamento.");
      });
  }

  return (
    <Container>
      <StatusBar translucent style="dark" />
      <Header>
        <BackButton onPress={handleNavigateToScheduling} />
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{formattedStartDate}</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text} />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{formattedEndDate}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceDetails>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceQuota>
              R$ {car.rent.price} x{numberOfDatesInInterval} diárias
            </RentalPriceQuota>
          </RentalPriceDetails>

          <RentalPriceTotal>
            R$ {car.rent.price * numberOfDatesInInterval}
          </RentalPriceTotal>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          color={theme.colors.success}
          title="Alugar agora"
          onPress={handleConfirmRental}
          isLoading={isLoading}
        />
      </Footer>
    </Container>
  );
}
