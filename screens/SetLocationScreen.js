import React from 'react'
import { View, Text, Button } from 'react-native'
import GetLocation from '../containers/GetLocation'
import MenuButton from '../components/MenuOpenButton'

export default class SetLocationScreen extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  static navigationOptions = {
    drawerLabel: 'Set Location',
  };


  render() {
    return (
      <View>
        <Text>Set location</Text>
        <GetLocation/>
      </View>
    )
  }
}