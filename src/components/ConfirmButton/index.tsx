import { Container, Title } from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";

interface ConfirmButtonProps extends RectButtonProps {
  title: string;
}

export function ConfirmButton({ title, ...rest }: ConfirmButtonProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
