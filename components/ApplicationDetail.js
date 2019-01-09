import React from "react";
import styled from "styled-components";
import { View } from "react-native";
import { Geokit, LatLngLiteral } from "geokit";

const ApplicationDetail = ({ app, center, navigate }) => {
  const distance = Geokit.distance(app, {
    lat: center.latitude,
    lng: center.longitude
  });

  return (
    <Outer onPress={navigate}>
      <View>
        <Title>{app.title}</Title>
        <Address>{app.address}</Address>
        <Distance>{Math.round(distance * 100) / 100}km</Distance>
      </View>
    </Outer>
  );
};

const Outer = styled.TouchableHighlight`
  background: #ff0;
  padding: 10px;
`;

const Title = styled.Text`
  color: blueviolet;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Address = styled.Text`
  color: cadetblue;
  margin-bottom: 10px;
`;

const Distance = styled.Text`
  background: #0f0;
  padding: 10px;
`;

export default ApplicationDetail;
