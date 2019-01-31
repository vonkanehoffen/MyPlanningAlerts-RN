import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import { colors } from "../theme";

const Outer = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${colors.primary};
`;

function LoadingScreen() {
  return (
    <Outer>
      <ActivityIndicator color="white" size={50} />
    </Outer>
  );
}

export default LoadingScreen;
