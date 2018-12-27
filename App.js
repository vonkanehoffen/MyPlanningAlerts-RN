import React from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'react-native-firebase'
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import SetLocationScreen from './screens/SetLocationScreen'
import HomeScreen from './screens/HomeScreen'
import DetailsScreen from './screens/DetailsScreen';
import { colors } from './theme';
import AboutScreen from './screens/AboutScreen'
import VersionScreen from './screens/VersionScreen'
import SearchRadiusScreen from './screens/SearchRadiusScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import DrawerContent from './components/DrawerContent'

/**
 * Navigation setup....
 * The main map view and planning app detail screens
 */
const HomeStack = createStackNavigator(
  {
    Map: HomeScreen,
    Details: DetailsScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }

  }
)

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
    Version: VersionScreen,
  },
  {
    contentComponent: DrawerContent,
  }
);


const AppContainer = createAppContainer(RootStack);

export const UserContext = React.createContext({
  fcmToken: false,
})

export default class App extends React.Component {

  state = {
    fcmToken: false,
  }

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
    this.setState({
      fcmToken: await firebase.messaging().getToken()
    });
    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
      // TODO: Process your token as required .... should only be on app uninstall though.
      console.warn(`Token Changed... ${fcmToken}`)
      this.setState({ fcmToken });
    });
  }

  componentWillUnmount() {
    this.onTokenRefreshListener();
  }

  render() {
    return (
      <UserContext.Provider value={{ fcmToken: this.state.fcmToken }}>
        <AppContainer />
      </UserContext.Provider>
    )
  }
}
