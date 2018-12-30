import React from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import { db } from '../App'

export default class SearchRadiusScreen extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  static navigationOptions = {
    drawerLabel: 'Set search radius',
  };

  async setRadius(radius) {
    // TODO: Perhaps this needs to happen higher up the hierarchy, so change gets reflected to other components?
    await db.collection('users').doc(this.props.screenProps.userId).update({
      searchRadius: radius,
    })
  }

  render() {
    return (
      <View>
        <Text>Set search radius here</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Search radius"
          onChangeText={r => this.setRadius(r)}/>
      </View>
    )
  }
}