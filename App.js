import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import firebase from "react-native-firebase";
import { Provider } from "react-redux";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator
} from "react-navigation";
import SetLocationScreen from "./screens/SetLocationScreen";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import { colors } from "./theme";
import AboutScreen from "./screens/AboutScreen";
import VersionScreen from "./screens/VersionScreen";
import SearchRadiusScreen from "./screens/SearchRadiusScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import NewUserScreen from "./screens/NewUserScreen";
import DrawerContent from "./components/DrawerContent";
import { GeoFirestore } from "geofirestore";
import store from "./store";

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
    headerMode: "none"
  }
);

/**
 * The root navigation stack (accessible via a nav drawer)
 * which wraps the above
 */
const DrawerStack = createDrawerNavigator(
  {
    Home: HomeStack,
    SetLocation: SetLocationScreen,
    SearchRadius: SearchRadiusScreen,
    Notifications: NotificationsScreen,
    About: AboutScreen,
    Version: VersionScreen
  },
  {
    contentComponent: DrawerContent,
    initialRouteName: "Home"
  }
);

const AuthStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    NewUser: NewUserScreen,
    App: DrawerStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);

const AppContainer = createAppContainer(AuthStack);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
