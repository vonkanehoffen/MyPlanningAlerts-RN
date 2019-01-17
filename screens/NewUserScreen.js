import React from "react";
import { View, Text, Button } from "react-native";
import MenuButton from "../components/MenuOpenButton";

export default class NewUserScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>New user here</Text>
      </View>
    );
  }
}
