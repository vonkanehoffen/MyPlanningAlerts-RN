import styled from "styled-components";

const TextInput = styled.TextInput.attrs({
  placeholderTextColor: "white"
})`
  font-family: "IBMPlexSans-Medium";
  font-size: 18px;
  border: 1px solid white;
  border-radius: 4px;
  padding: 10px;
  color: white;
`;

export default TextInput;
