import React from "react";
import { View, Text, Button } from "react-native";
import FirestoreTest from "../containers/FirestoreTest";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class DetailsScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static navigationOptions = {
    headerTitle: "Details view"
  };

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("item", false);
    return (
      <View>
        <Text>Planning app details here</Text>
        <Text>{JSON.stringify(item, null, 2)}</Text>
        {/*<FirestoreTest />*/}
      </View>
    );
  }
}
