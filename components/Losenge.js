import React from "react";
import styled from "styled-components";
import { colors } from "../theme";

const Losenge = styled.Text`
  font-family: "IBMPlexSans-Medium";
  font-size: 14px;
  color: white;
  background: ${colors.secondary};
  padding: 5px 10px;
  margin: 0 5px 5px 0;
  border-radius: 20px;
`;

export default Losenge;
