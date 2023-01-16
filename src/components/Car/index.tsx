import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from "./styles";

import { RectButtonProps } from "react-native-gesture-handler";
import { cars } from "../../services/server.json";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

export type CarType = (typeof cars)[0];

interface CarProps extends RectButtonProps {
  data: CarType;
}

export function Car({
  data: { rent, name, brand, thumbnail, fuel_type },
  ...rest
}: CarProps) {
  const MotorIcon = getAccessoryIcon(fuel_type);
  return (
    <Container {...rest}>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{rent.period}</Period>
            <Price>R$ {rent.price}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{
          uri: thumbnail,
        }}
        resizeMode="cover"
      />
    </Container>
  );
}
