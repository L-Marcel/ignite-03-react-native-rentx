import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => {
    return theme.colors.backgroundSecondary;
  }};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(325)}px;
  justify-content: center;
  padding: 25px;
  background-color: ${({ theme }) => {
    return theme.colors.header;
  }};
  padding-top: ${getStatusBarHeight() + 30}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => {
    return theme.colors.shape;
  }};
  font-family: ${({ theme }) => {
    return theme.fonts.secondary600;
  }};
  font-size: ${RFValue(34)}px;
  margin-top: 24px;
`;

export const RentalPeriod = styled.View`
  width: 100%;
  margin-top: 32px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  color: ${({ theme }) => {
    return theme.colors.shape;
  }};
  font-family: ${({ theme }) => {
    return theme.fonts.secondary500;
  }};
  font-size: ${RFValue(10)}px;
`;

interface DateValueProps {
  selected: boolean;
}

export const DateValue = styled.Text<DateValueProps>`
  color: ${({ theme }) => {
    return theme.colors.shape;
  }};
  font-family: ${({ theme }) => {
    return theme.fonts.primary500;
  }};
  font-size: ${RFValue(15)}px;

  ${({ selected, theme }) => {
    return (
      !selected &&
      css`
        border-bottom-width: 1px;
        border-bottom-color: ${theme.colors.text};
        padding-bottom: 5px;
      `
    );
  }}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24,
  },
  showsVerticalScrollIndicator: false,
})``;

export const Footer = styled.View`
  padding: 24px;
`;
