import {
  Calendar as CustomCalendar,
  LocaleConfig,
  DateData,
  CalendarProps,
} from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { ptBrLocale } from "./localeConfig";

LocaleConfig.locales["pt-br"] = ptBrLocale;
LocaleConfig.defaultLocale = "pt-br";

export interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

export function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={(direction) => {
        return (
          <Feather
            size={24}
            color={theme.colors.shape}
            name={direction === "left" ? "chevron-left" : "chevron-right"}
          />
        );
      }}
      headerStyle={{
        backgroundColor: theme.colors.backgroundSecondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.textDetail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary400,
        textDayHeaderFontFamily: theme.fonts.primary500,
        textMonthFontSize: 20,
        textMonthFontFamily: theme.fonts.secondary500,
        textDayHeaderFontSize: 10,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={new Date().toString()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    ></CustomCalendar>
  );
}
