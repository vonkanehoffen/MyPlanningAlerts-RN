import React from 'react';
import { View, Text, Button } from 'react-native';
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

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
