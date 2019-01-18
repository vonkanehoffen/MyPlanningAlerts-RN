import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, Text, Button } from "react-native";
import GetLocation from "../containers/GetLocation";
import MenuButton from "../components/MenuOpenButton";
import { db } from "../App";
import { setUserLocation } from "../store/actionCreators";

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
      <View>
        <Text>Set location</Text>
        <Text>{JSON.stringify(this.props, null, 2)}</Text>
        <GetLocation setLocation={setUserLocation} />
      </View>
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
