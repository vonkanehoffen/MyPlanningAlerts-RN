import React from "react";
import styled from "styled-components";
import { Button, View } from "react-native";
import { DrawerActions, withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../theme";

const MenuOpenButton = ({ navigation }) => {
  return (
    <Outer>
      <Icon
        name="menu"
        color={colors.theme}
        size={30}
        onPress={() => navigation.openDrawer()}
        title="Open drawer"
      />
    </Outer>
  );
};

const Outer = styled.View`
  position: absolute;
  top: 10px;
  left: 10px;
`;
export default withNavigation(MenuOpenButton);
