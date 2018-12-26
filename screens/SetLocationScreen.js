import React from 'react'
import { View, Text, Button } from 'react-native'
import GetLocation from '../containers/GetLocation'

export default class SetLocationScreen extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <View>
        <Text>Set location</Text>
        <GetLocation/>
      </View>
    )
  }
}