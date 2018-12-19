import React from 'react'
import firebase from 'react-native-firebase'
import { View, ScrollView, StyleSheet, Text, Button } from 'react-native'

// Note: we'll need this for Android:
// https://facebook.github.io/react-native/docs/geolocation
// https://facebook.github.io/react-native/docs/permissionsandroid.html
// ACCESS_FINE_LOCATION

class GetLocation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {

  }

  doLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={this.doLocation} title="Get Location"/>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }

}

export default GetLocation

