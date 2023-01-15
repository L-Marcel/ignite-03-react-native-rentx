import { Container, Content, Title, Message, Footer } from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { useWindowDimensions } from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

interface SchedulingCompleteProps {}

export function SchedulingComplete({}: SchedulingCompleteProps) {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();

  function handleNavigateToHome() {
    navigate("Home" as never);
  }

  return (
    <Container>
      <StatusBar translucent style="light" />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado</Title>

        <Message>
          Agora você só precisa ir {"\n"}
          até a concessionária da RENTX {"\n"}
          pegar o seu automóvel.
        </Message>
      </Content>
      <Footer>
        <ConfirmButton title="OK" onPress={handleNavigateToHome} />
      </Footer>
    </Container>
  );
}
