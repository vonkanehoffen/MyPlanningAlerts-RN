import React from "react";
import styled from "styled-components";
import { Geokit, LatLngLiteral } from "geokit";

const ApplicationDetail = ({ app, center }) => {
  const distance = Geokit.distance(app, {
    lat: center.latitude,
    lng: center.longitude
  });

  return (
    <Outer>
      <Title>{app.title}</Title>
      <Address>{app.address}</Address>
      <Distance>{distance}</Distance>
    </Outer>
  );
};

const Outer = styled.View`
  border: 2px solid #000;
  background: #fff;
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
