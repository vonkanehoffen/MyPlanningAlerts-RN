import React from 'react'
import { View, Text, Button } from 'react-native'
import MenuButton from '../components/MenuButton'

export default class AboutScreen extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  static navigationOptions = {
    drawerLabel: 'About things....',
    headerTitle: 'About my planning wotsit'
  };

  render() {
    return (
      <View>
        <Text>About screen here</Text>
      </View>
    )
  }
}