import React from 'react'
import { View, Text, Button } from 'react-native'

export default class SearchRadiusScreen extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  static navigationOptions = {
    drawerLabel: 'Set search radius',
  };

  render() {
    return (
      <View>
        <Text>Set search radius here</Text>
      </View>
    )
  }
}