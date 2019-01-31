import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import MenuCloseButton from "./MenuCloseButton";

const DrawerContent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <MenuCloseButton />
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default DrawerContent;
