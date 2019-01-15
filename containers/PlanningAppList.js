import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { View, Text, Button } from "react-native";
import { DrawerActions, withNavigation } from "react-navigation";
import PlanningAppListItem from "../components/PlanningAppListItem";
import { colors } from "../theme";

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
        {items.map((location, i) => (
          <View key={i}>
            {location.apps.map(item => (
              <PlanningAppListItem
                key={item.ref}
                app={item}
                center={center}
                navigate={() => navigation.navigate("Details", { item })}
              />
            ))}
          </View>
        ))}
      </Outer>
    );
  }
}

const Outer = styled.ScrollView`
  flex: 1;
  background: ${colors.primary};
`;

export default withNavigation(PlanningAppList);
