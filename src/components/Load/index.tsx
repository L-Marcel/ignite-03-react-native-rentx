import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";

interface LoadProps {}

export function Load({}: LoadProps) {
  const theme = useTheme();

  return <ActivityIndicator color={theme.colors.main} size="large" style={{ flex: 1 }} />;
}
