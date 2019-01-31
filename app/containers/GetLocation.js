import React from "react";
import PropTypes from "prop-types";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  PermissionsAndroid,
  Platform
} from "react-native";
import BigButton from "../components/BigButton";
import Geolocation from "react-native-geolocation-service";

class GetLocation extends React.Component {
  static propTypes = {
    setLocation: PropTypes.func.isRequired
  };

  state = {
    latitude: null,
    longitude: null,
    error: null,
    fetching: false,
    hasLocationPermission: Platform.OS === "ios" // All iOS apps have location permission I think?
  };

  componentDidMount = async () => {
    if (Platform.OS === "android") {
      this.setState({
        hasLocationPermission: await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        )
      });
    }
  };

  /**
   * Get the user's position and save it to firestore and app state
   * @returns {Promise<void>}
   */
  doLocation = async () => {
    console.log("doing lcoation");
    if (Platform.OS === "android" && !this.state.hasLocationPermission) {
      this.setState({
        hasLocationPermission: await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "My Planning Alerts needs to access your location",
            message: "To see where you care about!"
          }
        ) // = granted
      });
    }

    this.setState({ fetching: true });

    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          fetching: false
        });

        this.props.setLocation(position.coords);
      },
      error => {
        this.setState({ error: error.message, fetching: false });
      },

      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  render() {
    const {
      latitude,
      longitude,
      error,
      fetching,
      hasLocationPermission
    } = this.state;

    // if (!hasLocationPermission)
    //   return <Text>Location permission not granted! TODO: Style this</Text>;

    return (
      <BigButton
        onPress={this.doLocation}
        label="Get Location"
        icon={
          error
            ? "location-disabled"
            : fetching
            ? "access-time"
            : "location-searching"
        }
      />
    );
  }
}

export default GetLocation;
