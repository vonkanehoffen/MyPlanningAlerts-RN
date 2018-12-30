import React from 'react'
import { View, Text, Button } from 'react-native'
import PlanningMap from '../containers/PlanningMap'
import Icon from 'react-native-vector-icons/MaterialIcons';
import MenuButton from '../components/MenuOpenButton'
import { db } from '../App'
import firebase from 'react-native-firebase'

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    headerTitle: 'Home',
    headerLeft: <MenuButton/>
  };

  state = {
    planningApps: [],
    user: {
      location: false,
    },
  }

  /**
   * Get relevant planning applications
   */
  async componentDidMount() {

    let planningApps = []

    const planningAppsQuery = await db.collection('planningApps').get();
    planningAppsQuery.forEach(doc => planningApps.push(doc.data()));
    this.setState({planningApps});

    const id = this.props.screenProps.userId;
    const user = await db.collection('users').doc(id).get();
    this.setState({ user: user.data() })

  }

  render() {
    const { planningApps, user } = this.state;
    const { navigation, screenProps: { userId } } = this.props;

    if(user.location) {
      return (
        <View>
          <PlanningMap markers={planningApps} center={user.location}/>
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
          />
          <Text>fcm token from screenprops: {userId}</Text>
        </View>
      )
    } else {
      return (
        <View>
          <Text>No Location!</Text>
          <Text>{JSON.stringify(this.state, null, 2)}</Text>
        </View>
      )
    }
  }
}