import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { View } from "react-native";
import { Geokit, LatLngLiteral } from "geokit";
import { colors } from "../theme";
import Losenge from "../components/Losenge";
import Icon from "react-native-vector-icons/MaterialIcons";

const PlanningAppListItem = ({ item, center, navigate, _map }) => {
  const distance = Geokit.distance(item, {
    lat: center.latitude,
    lng: center.longitude
  });

  return (
    <Outer onPress={() => _map.animateCamera(item.lat, item.lng, 1000)}>
      <Inner>
        <Icon name="location-on" size={40} color={colors.secondary} />
        <Content>
          <Title>{item.title}</Title>
          {/*<Address>{item.address}</Address>*/}
          {/*<Distance>{Math.round(distance * 100) / 100}km</Distance>*/}
          <Meta>
            <Losenge onPress={navigate}>{item.status}</Losenge>
          </Meta>
        </Content>
      </Inner>
    </Outer>
  );
};

PlanningAppListItem.propTypes = {
  item: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
  _map: PropTypes.object // ref
};

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

const Address = styled.Text`
  color: cadetblue;
  margin-bottom: 10px;
`;

const Distance = styled.Text`
  background: #0f0;
  padding: 10px;
`;

export default PlanningAppListItem;
