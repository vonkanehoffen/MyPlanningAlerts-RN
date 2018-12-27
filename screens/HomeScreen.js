import React from 'react'
import { View, Text, Button } from 'react-native'
import PlanningMap from '../containers/PlanningMap'
import Icon from 'react-native-vector-icons/MaterialIcons';
import MenuButton from '../components/MenuButton'

export default class HomeScreen extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  static navigationOptions = {
    headerTitle: 'Home',
    headerLeft: <MenuButton/>
  };

  render() {
    return (
      <View>
        <PlanningMap/>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    )
  }
}