import React from 'react'
import { View, Text, Button } from 'react-native'
import PlanningMap from '../containers/PlanningMap'
import Icon from 'react-native-vector-icons/MaterialIcons';
import MenuButton from '../components/MenuOpenButton'
import firebase from "react-native-firebase"

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    headerTitle: 'Home',
    headerLeft: <MenuButton/>
  };

  state = {
    planningApps: [],
  }

  /**
   * Get relevant planning applications
   */
  componentDidMount() {
    const db = firebase.firestore().collection('planningApps');

    let planningApps = []

    db.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const app = doc.data();
        planningApps.push(app)
      });
      this.setState({planningApps})
    });
  }

  render() {
    const { planningApps } = this.state;
    const { navigation, screenProps: { userId } } = this.props;

    return (
      <View>
        <PlanningMap markers={planningApps}/>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
        <Text>fcm token from screenprops: {userId}</Text>
      </View>
    )
  }
}