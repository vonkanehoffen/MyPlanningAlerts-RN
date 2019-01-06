import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';

export default class PlanningAppList extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  static propTypes = {
    items: PropTypes.array.isRequired,
  }

  render() {
    const { items } = this.props;

    return (
      <View>
        <Text>Count: {items.length}</Text>
        {this.props.items.map((item, i) =>
          <Text key={i}>{item.address}</Text>
        )}
      </View>
    )
  }
}