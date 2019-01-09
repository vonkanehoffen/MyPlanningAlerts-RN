import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { View, Text, Button } from "react-native";
import { DrawerActions, withNavigation } from "react-navigation";
import ApplicationDetail from "../components/ApplicationDetail";

class PlanningAppList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    const { items, center, navigation } = this.props;

    return (
      <Outer>
        <Text>Count: {items.length}</Text>
        {items.map((location, i) => (
          <View key={i}>
            {location.apps.map(item => (
              <ApplicationDetail
                key={item.ref}
                app={item}
                center={center}
                navigate={() => navigation.navigate("Details", { item })}
              />
            ))}
          </View>
        ))}
        <Text>{JSON.stringify(items, null, 2)}</Text>
      </Outer>
    );
  }
}

const Outer = styled.ScrollView`
  flex: 1;
  background: steelblue;
`;

export default withNavigation(PlanningAppList);
