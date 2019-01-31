import React from "react";
import styled from "styled-components";
import { Button, View } from "react-native";
import { DrawerActions, withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";

const MenuCloseButton = ({ navigation }) => {
  return (
    <Icon
      name="close"
      color="black"
      size={30}
      onPress={() => navigation.closeDrawer()}
    />
  );
};

export default withNavigation(MenuCloseButton);
