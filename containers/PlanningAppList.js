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
    items: PropTypes.array.isRequired,
    center: PropTypes.object.isRequired,
    _map: PropTypes.object // Ref. Hmm... :
    // https://stackoverflow.com/questions/48007326/what-is-the-correct-proptype-for-a-ref-in-react
  };

  render() {
    const { items, center, navigation, _map } = this.props;

    return (
      <Outer>
        {items.map((location, i) => (
          <View key={i}>
            {location.apps.map(item => (
              <PlanningAppListItem
                key={item.ref}
                item={item}
                center={center}
                _map={_map}
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
