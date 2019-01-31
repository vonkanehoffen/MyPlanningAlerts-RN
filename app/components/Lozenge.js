import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import { colors } from "../theme";
import Icon from "react-native-vector-icons/MaterialIcons";

function Lozenge({ icon, label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <Outer>
        <Label>{label}</Label>
        {icon && <Icon name={icon} color="white" size={25} />}
      </Outer>
    </TouchableOpacity>
  );
}

const Outer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${colors.secondary};
  margin: 0 5px 5px 0;
  padding: 0 5px;
  border-radius: 20px;
`;

const Label = styled.Text`
  font-family: "IBMPlexSans-Medium";
  font-size: 14px;
  color: white;
  padding: 5px;
`;

export default Lozenge;
