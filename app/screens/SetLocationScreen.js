import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, Text, Button } from "react-native";
import GetLocation from "../containers/GetLocation";
import MenuButton from "../components/MenuOpenButton";
import { db } from "../../App";
import {
  setUserLocation,
  fetchUserPlanningApps
} from "../store/actionCreators";
import PageOuter from "../components/PageOuter";
import H1 from "../components/H1";
import AppLogo from "../components/AppLogo";

class SetLocationScreen extends React.Component {
  static propTypes = {
    screenProps: PropTypes.object
  };

  static navigationOptions = {
    drawerLabel: "Set Location"
  };

  render() {
    const { setUserLocation, fetchUserPlanningApps } = this.props;
    return (
      <PageOuter>
        <AppLogo />
        <H1>Where do you live?</H1>
        <H1>
          We'll show you the planning applications that have been made near you.
        </H1>
        <GetLocation
          setLocation={async location => {
            await setUserLocation(location);
            console.log("set loc...");
            fetchUserPlanningApps();
            this.props.navigation.navigate("SearchRadius");
          }}
        />
      </PageOuter>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  setUserLocation,
  fetchUserPlanningApps
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetLocationScreen);
