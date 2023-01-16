import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home/index";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling/index";
import { SchedulingDetails } from "../screens/SchedulingDetails/index";
import { SchedulingComplete } from "../screens/SchedulingComplete/index";
import { MyCars } from "../screens/MyCars/index";
import { Splash } from "../screens/Splash/index";

const { Navigator, Screen } = createStackNavigator();

interface StackRoutesProps {}

export function StackRoutes({}: StackRoutesProps) {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Screen name="Splash" component={Splash} />
      <Screen
        options={{
          gestureEnabled: false,
        }}
        name="Home"
        component={Home}
      />
      <Screen name="MyCars" component={MyCars} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
    </Navigator>
  );
}
