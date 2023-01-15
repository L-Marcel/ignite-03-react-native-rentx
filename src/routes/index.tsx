import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./Stack.routes";

interface RoutesProps {}

export function Routes({}: RoutesProps) {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}
