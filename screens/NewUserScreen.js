import React from "react";
import { View, Text, Button } from "react-native";
import MenuButton from "../components/MenuOpenButton";
import PageOuter from "../components/PageOuter";
import H1 from "../components/H1";
import BigButton from "../components/BigButton";
import AppLogo from "../components/AppLogo";

export default class NewUserScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <PageOuter>
        <AppLogo />
        <H1>Welcome to My Planning Alerts.</H1>
        <H1>It's time you knew what's happening in you neighbourhood :-)</H1>
        <BigButton
          onPress={() => this.props.navigation.navigate("SetLocation")}
          label="Let's get started!"
        />
      </PageOuter>
    );
  }
}
