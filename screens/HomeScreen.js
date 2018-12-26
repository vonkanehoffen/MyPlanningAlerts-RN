import React from 'react'
import { View, Text, Button } from 'react-native'
import PlanningMap from '../containers/PlanningMap'

export default class HomeScreen extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <View>
        <Text>Home Screen</Text>
        <PlanningMap/>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Go to Set location"
          onPress={() => this.props.navigation.navigate('SetLocation')}
        />
      </View>
    )
  }
}