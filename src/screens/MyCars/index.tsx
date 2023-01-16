import {
  Container,
  Header,
  Subtitle,
  Title,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
} from "./styles";
import { Car } from "../../components/Car/index";
import { useQuery } from "react-query";
import { api } from "../../services/api";
import { useRefreshOnFocus } from "../../context/hooks/useRefreshOnFocus";
import { Load } from "../../components/Load/index";
import { View } from "react-native";
import { BackButton } from "../../components/BackButton";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { UserSchedule } from "../SchedulingDetails/index";
import { AntDesign } from "@expo/vector-icons";
import {
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";
import { LoadAnimation } from "../../components/LoadAnimation";

interface MyCarsProps {}

export function MyCars({}: MyCarsProps) {
  const theme = useTheme();
  const { navigate } = useNavigation();

  function handleNavigateToHome() {
    navigate("Home" as never);
  }

  const { data, refetch, isFetching } = useQuery(
    "my_cars",
    async () => {
      return await api.get<UserSchedule[]>("/schedules_byuser?user_id=1").then((res) => {
        return res.data;
      });
    },
    {
      initialData: [],
      refetchOnMount: true,
    }
  );

  useRefreshOnFocus(refetch);

  const numberOfRentals = data.length;

  return (
    <Container>
      <Header>
        <View style={{ alignSelf: "flex-start" }}>
          <BackButton onPress={handleNavigateToHome} color={theme.colors.shape} />
        </View>

        <Title>
          Seus agendamentos, {"\n"}
          estão aqui.
        </Title>

        <Subtitle>Conforto, segurança e praticidade.</Subtitle>
      </Header>
      <Content>
        <Appointments>
          <AppointmentsTitle>
            {isFetching ? "Carregando agentamentos..." : "Agendamentos feitos"}
          </AppointmentsTitle>
          {!isFetching && (
            <AppointmentsQuantity>
              {String(numberOfRentals).padStart(2, "0")}
            </AppointmentsQuantity>
          )}
        </Appointments>
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
          <FlatList
            data={data}
            keyExtractor={(schedule) => {
              return String(schedule.id);
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <CarWrapper>
                  <Car data={item.car} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{
                          marginHorizontal: 10,
                        }}
                      />
                      <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              );
            }}
          />
        )}
      </Content>
    </Container>
  );
}
