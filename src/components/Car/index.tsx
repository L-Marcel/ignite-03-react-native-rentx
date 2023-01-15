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
import TypeSvg from "../../assets/gasoline.svg";
import { RectButtonProps } from "react-native-gesture-handler";

export type RentType = {
  period: string;
  price: number;
};

export type CarType = {
  id: string;
  brand: string;
  name: string;
  rent: RentType;
  thumbnail: string;
};

interface CarProps extends RectButtonProps {
  data: CarType;
}

export function Car({ data: { rent, name, brand, thumbnail }, ...rest }: CarProps) {
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
            <TypeSvg />
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
