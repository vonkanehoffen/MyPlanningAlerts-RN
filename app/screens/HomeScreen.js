import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { View, Text, Button, ActivityIndicator } from "react-native";
import PlanningMap from "../containers/PlanningMap";
import Icon from "react-native-vector-icons/MaterialIcons";
import MenuButton from "../components/MenuOpenButton";
import { db, geoFirestore } from "../../App";
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
import planningApps from "../store/reducers/planningApps";

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
      userLocation,
      searchRadius,
      planningAppsData,
      planningAppsLoading,
      planningAppsError,
      focusedLocation,
      // Actions
      fetchUserPlanningApps,
      setFocusedLocation
    } = this.props;

    if (planningAppsLoading)
      return (
        <Outer>
          <ActivityIndicator size="large" color="blue" />
        </Outer>
      );

    return (
      <Outer>
        <PlanningMap
          markers={planningAppsData}
          center={userLocation}
          radius={searchRadius}
          selectPA={setFocusedLocation}
          ref={ref => (this._map = ref)}
        />
        <MenuButton />
        <PlanningAppList
          items={planningAppsData}
          center={userLocation}
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
    userLocation: state.getIn(["user", "userData", "location"]),
    searchRadius: state.getIn(["user", "userData", "searchRadius"]),
    planningAppsData: state.getIn(["planningApps", "planningAppsData"]) || [],
    planningAppsLoading: state.getIn(["planningApps", "loading"]),
    planningAppsError: state.getIn(["planningApps", "error"]),
    focusedLocation: state.getIn(["user", "focusedLocation"])
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
