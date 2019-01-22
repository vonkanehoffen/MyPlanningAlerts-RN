import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, Text, Button } from "react-native";
import GetLocation from "../containers/GetLocation";
import MenuButton from "../components/MenuOpenButton";
import { db } from "../App";
import { setUserLocation } from "../store/actionCreators";
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
    const { setUserLocation } = this.props;
    return (
      <PageOuter>
        <AppLogo />
        <H1>Where do you live?</H1>
        <H1>
          We'll show you the planning applications that have been made near you.
        </H1>
        <GetLocation
          setLocation={location => {
            setUserLocation(location);
            this.props.navigation.navigate("SearchRadius");
            // TODO: Move location search component to this screen and split lookup to helper?
          }}
        />
      </PageOuter>
    );
  }
}

const mapStateToProps = state => {
  return {
    fcmToken: state.app.fcmToken,
    user: state.app.user
  };
};

const mapDispatchToProps = {
  setUserLocation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetLocationScreen);
