import React from "react";
import { View, Text, Button } from "react-native";
import MenuButton from "../components/MenuOpenButton";

export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <Text>Auth loading here</Text>
        <Button
          title="go to new user screen"
          onPress={() => navigate("NewUser")}
        />
        <Button title="go to app" onPress={() => navigate("App")} />
      </View>
    );
  }
}
