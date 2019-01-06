import React, { Component } from "react";
import firebase from "react-native-firebase";
import { ScrollView, StyleSheet, Text } from "react-native";

class FirestoreTest extends Component {
  constructor() {
    super();
    this.db = firebase.firestore().collection("planningApps");
    this.state = {
      planningApps: []
    };
  }

  componentDidMount() {
    let planningApps = [];
    this.db.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const app = doc.data();
        planningApps.push(app);
      });
      this.setState({ planningApps });
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.planningApps.map(a => (
          <Text key={a.ref}>{a.ref}</Text>
        ))}
        <Text>What</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  output: {
    color: "#620",
    backgroundColor: "#99f"
  },
  container: {
    backgroundColor: "#0f0"
  }
});

export default FirestoreTest;
