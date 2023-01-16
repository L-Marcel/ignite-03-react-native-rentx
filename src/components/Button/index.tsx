import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title } from "./styles";
import { ActivityIndicator } from "react-native";
import theme from "../../styles/theme";
import { useTheme } from "styled-components/native";

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: string;
  isLoading?: boolean;
}

export function Button({
  isLoading = false,
  title,
  color,
  enabled = true,
  ...rest
}: ButtonProps) {
  const theme = useTheme();

  return (
    <Container
      {...rest}
      enabled={enabled && !isLoading}
      style={{
        opacity: !enabled || isLoading ? 0.5 : 1,
      }}
      color={color}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
}
