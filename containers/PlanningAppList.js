import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { View, Text, Button } from "react-native";
import { DrawerActions, withNavigation } from "react-navigation";
import { colors } from "../theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import Lozenge from "../components/Lozenge";
import { Geokit } from "geokit";

class PlanningAppList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static propTypes = {
    items: PropTypes.array.isRequired,
    center: PropTypes.object.isRequired,
    selectedPA: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
      .isRequired,
    _map: PropTypes.object // Ref. Hmm... :
    // https://stackoverflow.com/questions/48007326/what-is-the-correct-proptype-for-a-ref-in-react
  };

  componentDidUpdate(prevProps) {
    const { selectedPA } = this.props;
    console.log("componentDidUpdate", selectedPA);
    if (selectedPA && prevProps.selectedPA !== selectedPA) {
      // This won't work with variable height rows FFS
      // https://github.com/facebook/react-native/issues/13727
      // this._list.scrollToIndex(selectedPA);
      this._list.scrollToEnd();
    }
  }

  render() {
    const { items, center, navigation, _map } = this.props;

    // Planning apps are grouped by location, so we ned to flatten the data
    // TODO: Do something about duped data... group by location with SectionList or something?
    let flatData = [];
    items.forEach(location => {
      location.apps.forEach(pa => {
        const distance = Geokit.distance(pa, {
          lat: center.latitude,
          lng: center.longitude
        });

        flatData.push({
          key: pa.ref,
          distance,
          ...pa
        });
      });
    });

    return (
      <List
        ref={ref => (this._list = ref)}
        data={flatData}
        renderItem={({ item }) => (
          <Outer onPress={() => _map.animateCamera(item.lat, item.lng, 1000)}>
            <Inner>
              <Icon name="location-on" size={40} color={colors.secondary} />
              <Content>
                <Title>{item.title}</Title>
                <Meta>
                  <Distance>{Math.round(item.distance * 100) / 100}km</Distance>
                  <Lozenge
                    onPress={() => navigation.navigate("Details", { item })}
                  >
                    {item.status}
                  </Lozenge>
                </Meta>
              </Content>
            </Inner>
          </Outer>
        )}
      />
    );
  }
}

const List = styled.FlatList`
  flex: 1;
  background: ${colors.primary};
`;

const Outer = styled.TouchableHighlight`
  background: ${colors.primary};
`;

const Inner = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px 10px 10px 0;
  width: 100%;
`;

const Content = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-family: "IBMPlexSans-Medium";
  color: white;
  margin-bottom: 10px;
`;

const Meta = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Distance = styled.Text`
  font-family: "IBMPlexSans-Medium";
  color: ${colors.secondary};
  padding: 5px 10px;
`;

export default withNavigation(PlanningAppList);
