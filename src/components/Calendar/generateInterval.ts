import { eachDayOfInterval, format } from "date-fns";
import { DateData } from "react-native-calendars";
import { getPlatformDate } from "../../utils/getPlatformDate";
import theme from "../../styles/theme";
import { MarkedDateProps } from ".";

export function generateInterval(start: DateData, end: DateData) {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach((item) => {
    const date = format(getPlatformDate(item), "yyyy-MM-dd");
    const isFirstOrEndDate = start.dateString === date || end.dateString === date;

    interval = {
      ...interval,
      [date]: {
        color: isFirstOrEndDate ? theme.colors.main : theme.colors.mainLight,
        textColor: isFirstOrEndDate ? theme.colors.mainLight : theme.colors.main,
      },
    };
  });

  return interval;
}
