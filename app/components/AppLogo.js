import React from "react";
import styled from "styled-components";
import { Svg, Path } from "react-native-svg";

const AppLogo = ({ size = 100 }) => (
  <Outer>
    <Svg width={size} height={(size / 200) * 140} viewBox="0 0 200 140">
      <Path
        fill="#ffffff"
        d="M153.62,74.36V18.89L126.74,0V37.13L100,.09,0,138.59H200ZM100,37.33l57.38,79.47H42.62Z"
      />
    </Svg>
  </Outer>
);

const Outer = styled.View`
  margin-bottom: 20px;
`;

export default AppLogo;
