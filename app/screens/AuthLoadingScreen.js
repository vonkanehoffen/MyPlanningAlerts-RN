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
      userLocation,
      userLoading
    } = this.props;

    if (!userLoading) {
      if (userLocation) {
        navigate("Home");
      } else {
        navigate("NewUser");
      }
    }
  }

  render() {
    const {
      navigation: { navigate },
      fcmTokenError,
      userError
    } = this.props;

    // Something's gone wrong...
    if (userError)
      return (
        <PageOuter>
          <Text>Error fetching user.</Text>
        </PageOuter>
      );

    if (fcmTokenError)
      return (
        <PageOuter>
          <Text>Error fetching FCM token</Text>
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
    fcmTokenLoading: state.getIn(["fcmToken", "loading"]),
    fcmTokenError: state.getIn(["fcmToken", "error"]),
    userLoading: state.getIn(["user", "loading"]),
    userLocation: state.getIn(["user", "userData", "location"]),
    userError: state.getIn(["user", "error"])
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
