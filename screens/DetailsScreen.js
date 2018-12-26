import React from 'react'
import { View, Text, Button } from 'react-native'
import FirestoreTest from '../containers/FirestoreTest'

export default class DetailsScreen extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <View>
        <Text>Planning app details here</Text>
        <FirestoreTest/>
      </View>
    )
  }
}