import React from "react";
import styled from "styled-components";
import { View, Text, Button } from "react-native";
import PlanningMap from "../containers/PlanningMap";
import Icon from "react-native-vector-icons/MaterialIcons";
import MenuButton from "../components/MenuOpenButton";
import { db, geoFirestore } from "../App";
import firebase from "react-native-firebase";
import {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot
} from "geofirestore";
import PlanningAppList from "../containers/PlanningAppList";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      planningApps: [],
      selectedPA: 0,
      user: {
        location: false
      }
    };
  }

  static navigationOptions = {
    headerMode: "none"
  };

  selectPA = index => {
    this.setState({ selectedPA: index });
  };

  /**
   * Get relevant planning applications
   */
  async componentDidMount() {
    // Get user so we know location to search near
    const id = this.props.screenProps.userId;
    const userQuery = await db
      .collection("users")
      .doc(id)
      .get();
    if (!userQuery.exists) return; // TODO: No user = redirect to setup screen or something?
    const user = userQuery.data();
    this.setState({ user: user });

    // Perform a geo-hashed search
    const geoCollection = geoFirestore.collection("planningLocations");
    console.log(
      `SEARCHING LAT ${user.location.latitude}, LON ${user.location.longitude}`
    );
    const query = geoCollection.near({
      center: new firebase.firestore.GeoPoint(
        user.location.latitude,
        user.location.longitude
      ),
      radius: user.searchRadius // km
    });
    const results = await query.get();

    let planningApps = [];
    results.forEach(doc => planningApps.push(doc.data()));
    this.setState({ planningApps });
  }

  render() {
    const { planningApps, user } = this.state;
    const {
      navigation,
      screenProps: { userId }
    } = this.props;

    if (user.location) {
      return (
        <Outer>
          <PlanningMap
            markers={planningApps}
            center={user.location}
            radius={user.searchRadius}
            selectPA={this.selectPA}
            ref={ref => (this._map = ref)}
          />
          <MenuButton />
          <PlanningAppList
            items={planningApps}
            center={user.location}
            selectedPA={this.state.selectedPA}
            _map={this._map}
          />
          {/*<Button*/}
          {/*title="Go to Details"*/}
          {/*onPress={() => navigation.navigate('Details')}*/}
          {/*/>*/}
          {/*<Text>fcm token from screenprops: {userId}</Text>*/}
        </Outer>
      );
    } else {
      return (
        <Outer>
          <Text>No Location!</Text>
          <Text>{JSON.stringify(this.state, null, 2)}</Text>
        </Outer>
      );
    }
  }
}

const Outer = styled.View`
  flex: 1;
`;
