import React from "react";
import { connect } from "react-redux";
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
import {
  fetchFCMToken,
  fetchUser,
  fetchUserPlanningApps,
  setFocusedLocation
} from "../store/actionCreators";
import PlanningAppList from "../containers/PlanningAppList";

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static navigationOptions = {
    headerMode: "none"
  };

  async componentDidMount() {
    this.props.fetchUserPlanningApps();
  }

  render() {
    const {
      user,
      planningApps,
      focusedLocation,
      fetchUserPlanningApps,
      setFocusedLocation
    } = this.props;

    if (!user.data)
      return (
        <Outer>
          <Text>No user data</Text>
        </Outer>
      );
    return (
      <Outer>
        <PlanningMap
          markers={planningApps.data || []}
          center={user.data.location}
          radius={user.data.searchRadius}
          selectPA={setFocusedLocation}
          ref={ref => (this._map = ref)}
        />
        <MenuButton />
        <PlanningAppList
          items={planningApps.data || []}
          center={user.data.location}
          selectedPA={focusedLocation}
          _map={this._map}
        />
      </Outer>
    );
  }
}

const Outer = styled.View`
  flex: 1;
`;

const mapStateToProps = state => {
  return {
    user: state.app.user,
    planningApps: state.app.planningApps,
    focusedLocation: state.app.focusedLocation
  };
};

const mapDispatchToProps = {
  fetchUserPlanningApps,
  setFocusedLocation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
