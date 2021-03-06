import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import TextInput from "../components/TextInput";
import { db } from "../../App";
import PageOuter from "../components/PageOuter";
import H1 from "../components/H1";

class SearchRadiusScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static navigationOptions = {
    drawerLabel: "Set search radius"
  };

  // async setRadius(radius) {
  //   await db
  //     .collection("users")
  //     .doc(this.props.screenProps.userId)
  //     .update({
  //       searchRadius: parseInt(radius)
  //     });
  // }

  render() {
    const { planningAppsCount, searchRadius } = this.props;

    return (
      <PageOuter>
        <H1>
          There are {planningAppsCount || "no"} planning applications open
          within {searchRadius}km of your address.
        </H1>
        <H1>We'll alert you when new ones are made.</H1>

        <Text>Set search radius here (km)</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Search radius"
          onChangeText={r => false}
        />
      </PageOuter>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchRadius: state.getIn(["user", "userData", "searchRadius"]),
    planningAppsCount: state.getIn(["planningApps", "planningAppsData"]).length
  };
};

const mapDispatchToProps = {
  // fetchUserPlanningApps,
  // setFocusedLocation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchRadiusScreen);
