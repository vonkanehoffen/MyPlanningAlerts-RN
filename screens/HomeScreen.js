import React from 'react'
import { View, Text, Button } from 'react-native'
import PlanningMap from '../containers/PlanningMap'
import Icon from 'react-native-vector-icons/MaterialIcons';
import MenuButton from '../components/MenuOpenButton'
import { UserContext } from '../App'

export default class HomeScreen extends React.Component {

  constructor() {
    super()
    this.state = {
      fcmToken: false,
    }
  }



  static navigationOptions = {
    headerTitle: 'Home',
    headerLeft: <MenuButton/>
  };

  render() {
    return (
      <UserContext.Consumer>
        {({fcmToken}) => (
          <View>
            <PlanningMap/>
            <Button
              title="Go to Details"
              onPress={() => this.props.navigation.navigate('Details')}
            />
            <Text>fcm token from context: {fcmToken}</Text>
          </View>
        )}
      </UserContext.Consumer>
    )
  }
}