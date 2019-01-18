import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { fetchFCMToken, fetchUser } from "../store/actionCreators";
import PageOuter from "../components/PageOuter";
import MenuButton from "../components/MenuOpenButton";
import { UNINITIALIZED } from "../store/constants";

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    await this.props.fetchFCMToken();
    await this.props.fetchUser();
  }

  componentDidUpdate() {
    const {
      navigation: { navigate },
      user
    } = this.props;

    if (user.data === UNINITIALIZED) return;

    // We have an existing initialized user:
    if (user.data && user.data.location) navigate("Home");
    //
    // // We don't....
    if (user.data === false) navigate("NewUser");
  }

  render() {
    const {
      navigation: { navigate },
      fcmToken,
      user
    } = this.props;

    // Something's gone wrong...
    if (fcmToken.error || user.error)
      return (
        <PageOuter>
          <Text>Oooops.</Text>
          <Text>{JSON.stringify(fcmToken, null, 2)}</Text>
          <Text>{JSON.stringify(user, null, 2)}</Text>
        </PageOuter>
      );

    return (
      <PageOuter>
        <ActivityIndicator size="large" color="white" />
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
  fetchFCMToken,
  fetchUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
