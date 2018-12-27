import React from 'react'
import { View, ScrollView, StyleSheet, Text, Button } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const PlanningMap = ({ markers }) => (
  <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
      {markers.map((marker, i) => marker.lat ? (
        <Marker
          coordinate={{latitude: marker.lat, longitude: marker.lng}}
          title={marker.title}
          key={i}
        />
      ) : false)}
    </MapView>
  </View>
)

export default PlanningMap