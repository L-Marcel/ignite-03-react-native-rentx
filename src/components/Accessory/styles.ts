import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 109px;
  height: 92px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => {
    return theme.colors.backgroundPrimary;
  }};
  padding: 16px;
  margin-bottom: 8px;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => {
    return theme.fonts.primary500;
  }};
  color: ${({ theme }) => {
    return theme.colors.text;
  }};
  font-size: ${RFValue(13)}px;
`;
