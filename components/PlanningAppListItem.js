import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { Geokit, LatLngLiteral } from "geokit";
import { colors } from "../theme";
import Losenge from "../components/Losenge";
import Icon from "react-native-vector-icons/MaterialIcons";

const PlanningAppListItem = ({ app, center, navigate }) => {
  const distance = Geokit.distance(app, {
    lat: center.latitude,
    lng: center.longitude
  });

  return (
    <Outer onPress={navigate}>
      <Inner>
        <Icon name="location-on" size={40} color={colors.secondary} />
        <Content>
          <Title>{app.title}</Title>
          {/*<Address>{app.address}</Address>*/}
          {/*<Distance>{Math.round(distance * 100) / 100}km</Distance>*/}
          <Meta>
            <Losenge>{app.status}</Losenge>
          </Meta>
        </Content>
      </Inner>
    </Outer>
  );
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
