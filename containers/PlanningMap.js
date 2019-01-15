import React from "react";
import PropTypes from "prop-types";
import { View, ScrollView, StyleSheet, Text, Button } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { regionFrom } from "../helpers/geo";

const styles = StyleSheet.create({
  container: {
    flex: 2
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

const PlanningMap = ({ markers, center, radius }) => {
  const region = regionFrom(center.latitude, center.longitude, radius * 1000);
  console.log("REGION -------", region);

  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
        {markers.map((marker, i) => {
          // TODO: this is only the location so the title is invalid. It needs to scroll the PlanningAppList view
          return marker.coordinates ? (
            <Marker
              coordinate={{
                latitude: marker.coordinates._latitude,
                longitude: marker.coordinates._longitude
              }}
              title={marker.apps[0].title}
              key={i}
            />
          ) : (
            false
          );
        })}
        <Marker coordinate={center} image={require("../assets/homePin.png")} />
      </MapView>
    </View>
  );
};

PlanningMap.propTypes = {
  markers: PropTypes.array.isRequired,
  center: PropTypes.object.isRequired,
  radius: PropTypes.number.isRequired
};

export default PlanningMap;
