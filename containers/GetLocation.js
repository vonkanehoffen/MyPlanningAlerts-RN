import React from 'react'
import firebase from 'react-native-firebase'
import { View, ScrollView, StyleSheet, Text, Button, PermissionsAndroid, Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { UserContext } from '../App'

// Note: we'll need this for Android:
// https://facebook.github.io/react-native/docs/geolocation
// https://facebook.github.io/react-native/docs/permissionsandroid.html
// ACCESS_FINE_LOCATION

// See: https://github.com/facebook/react-native/issues/7495
//
// Maybe use: https://www.npmjs.com/package/react-native-geolocation-service


class GetLocation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      fetching: false,
      hasLocationPermission: Platform.OS === 'ios', // All iOS apps have location permission I think?
    };
  }

  componentDidMount = async () => {
    if(Platform.OS === 'android') {
      this.setState({
        hasLocationPermission:
          await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      })
    }
  }

  doLocation = async (userId) => {
    if(Platform.OS === 'android' && !this.state.hasLocationPermission) {
      this.setState({
        hasLocationPermission:
          await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            title: 'My Planning Alerts needs to access your location',
            message: 'To see where you care about!'
          }) // = granted
      })
    }

    this.setState({fetching: true})

    Geolocation.getCurrentPosition(

      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          fetching: false,
        });
        const db = firebase.firestore().collection('users');

        db.doc(userId).set({
          location: position.coords,
        })
          .then(() => console.log('Location saved to firestore'))
          .catch(error => console.error('Error saving location:', error));

      },
      (error) => {
        this.setState({ error: error.message, fetching: false })
      },

      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  render() {
    const { latitude, longitude, error, fetching, hasLocationPermission } = this.state
    return (
      <UserContext.Consumer>
        {({ fcmToken }) => (
          <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Location permission? {hasLocationPermission ? 'yes': 'no'}</Text>
            <Button onPress={() => this.doLocation(fcmToken)} title="Get Location"/>
            <Text>Latitude: {latitude}</Text>
            <Text>Longitude: {longitude}</Text>
            {error ? <Text>Error: {error}</Text> : null}
            {fetching && <Text>Fetching...</Text>}
          </View>
        )}
      </UserContext.Consumer>
    );
  }

}

export default GetLocation

