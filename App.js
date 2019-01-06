import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import firebase from "react-native-firebase";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import SetLocationScreen from "./screens/SetLocationScreen";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import { colors } from "./theme";
import AboutScreen from "./screens/AboutScreen";
import VersionScreen from "./screens/VersionScreen";
import SearchRadiusScreen from "./screens/SearchRadiusScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import DrawerContent from "./components/DrawerContent";
import { GeoFirestore } from "geofirestore";

/**
 * Init Firestore DB
 * Note offline mode / persistence is enabled by default.
 * See https://rnfirebase.io/docs/v5.x.x/firestore/reference/firestore
 */
export const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

export const geoFirestore = new GeoFirestore(db);

/**
 * Navigation setup....
 * The main map view and planning app detail screens
 */
const HomeStack = createStackNavigator(
  {
    Map: HomeScreen,
    Details: DetailsScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "normal"
      }
    }
  }
);

/**
 * The root navigation stack (accessible via a nav drawer)
 * which wraps the above
 */
const RootStack = createDrawerNavigator(
  {
    Home: HomeStack,
    SetLocation: SetLocationScreen,
    SearchRadius: SearchRadiusScreen,
    Notifications: NotificationsScreen,
    About: AboutScreen,
    Version: VersionScreen
  },
  {
    contentComponent: DrawerContent
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  state = {
    fcmToken: false
  };

  /**
   * Get the FCM token for app context and monitor for any changes.
   * We'll use this to uniquely identify the user
   * TODO: this token could change (see below)...
   * so we'll need some transition from this to a Google sign-in when we get to that bit.
   *
   * https://rnfirebase.io/docs/v5.x.x/messaging/device-token
   * @returns {Promise<void>}
   */
  componentDidMount = async () => {
    const fcmToken = await firebase.messaging().getToken();
    console.log("GOT FCM TOKEN:", fcmToken);
    this.setState({
      fcmToken: fcmToken
    });
    this.onTokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh(fcmToken => {
        // TODO: Process your token as required .... should only be on app uninstall though.
        console.warn(`Token Changed... ${fcmToken}`);
        this.setState({ fcmToken });
      });

    // If we've got a token (we should have...) use it to retrieve the user's preferred location
    if (this.state.fcmToken) {
      // TODO
    }
  };

  componentWillUnmount() {
    this.onTokenRefreshListener();
  }

  render() {
    const { fcmToken } = this.state;

    if (!fcmToken) return <ActivityIndicator size="large" color="#0000ff" />;

    return (
      <AppContainer
        screenProps={{
          // This data will be passed as props to all screens:
          userId: fcmToken
        }}
      />
    );
  }
}
