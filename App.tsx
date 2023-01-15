import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";
import { ThemeProvider } from "styled-components";
import theme from "./src/styles/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SchedulingComplete } from "./src/screens/SchedulingComplete";
import * as ScreenOrientation from "expo-screen-orientation";
import { OrientationLock } from "expo-screen-orientation/build/ScreenOrientation.types";
import { Routes } from "./src/routes/index";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    await ScreenOrientation.lockAsync(OrientationLock.PORTRAIT);
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
