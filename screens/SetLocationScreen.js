import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button } from 'react-native'
import GetLocation from '../containers/GetLocation'
import MenuButton from '../components/MenuOpenButton'
import { db } from '../App'

export default class SetLocationScreen extends React.Component {

  static propTypes = {
    screenProps: PropTypes.object,
  }

  static navigationOptions = {
    drawerLabel: 'Set Location',
  };

  setLocation = async (location) => {
    db.collection('users').doc(this.props.screenProps.userId).set({ location })
      .then(() => console.log('Location saved to firestore'))
      .catch(error => console.error('Error saving location:', error));
  }


  render() {
    return (
      <View>
        <Text>Set location</Text>
        <Text>{JSON.stringify(this.props, null, 2)}</Text>
        <GetLocation setLocation={this.setLocation}/>
      </View>
    )
  }
}