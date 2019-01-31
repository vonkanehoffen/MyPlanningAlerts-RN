import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import styled from "styled-components";
import FirestoreTest from "../containers/FirestoreTest";
import Icon from "react-native-vector-icons/MaterialIcons";
import PageOuter from "../components/PageOuter";
import H3 from "../components/H3";
import H2 from "../components/H2";
import { colors } from "../theme";
import Lozenge from "../components/Lozenge";
import BigButton from "../components/BigButton";

export default class DetailsScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static navigationOptions = {
    headerTitle: "Details view"
  };

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("item", false);
    return (
      <PageOuter>
        <H2>{item.title}</H2>
        <Meta>
          <MetaIcon name="location-on" size={40} color={colors.secondary} />
          <H3>{item.address}</H3>
        </Meta>
        <Meta>
          <MetaIcon name="mail" size={40} color={colors.secondary} />
          <H3>{item.validatedDate}</H3>
        </Meta>
        <Meta>
          <MetaIcon name="account-balance" size={40} color={colors.secondary} />
          <H3>{`TODO: Council
${item.ref}`}</H3>
        </Meta>
        <Meta>
          {/*<MetaIcon name="comment" size={40} color={colors.secondary} />*/}
          <Lozenge label={item.status} />
          {item.openForComment && <Lozenge label="Open for comments" />}
        </Meta>
        <BigButton
          icon="arrow-forward"
          label="View & Comment"
          onPress={() => console.log(item.link)}
        />
      </PageOuter>
    );
  }
}

const Meta = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const MetaIcon = styled(Icon)`
  margin-right: 5px;
`;
