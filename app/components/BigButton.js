import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { colors } from "../theme";
import Icon from "react-native-vector-icons/MaterialIcons";

const Outer = styled.TouchableOpacity`
  background: white;
  padding: 10px;
  border-radius: 5px;
`;

const Inner = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const BtnText = styled.Text`
  font-family: "IBMPlexSans-Medium";
  font-size: 20px;
  color: ${colors.primary};
  flex: 1;
`;

const BtnIcon = styled(Icon)`
  align-self: flex-end;
`;

const BigButton = ({ onPress, label, icon }) => (
  <Outer onPress={onPress} activeOpacity={0.7}>
    <Inner>
      <BtnText>{label}</BtnText>
      <BtnIcon name={icon} size={40} color={colors.secondary} />
    </Inner>
  </Outer>
);

export default BigButton;
