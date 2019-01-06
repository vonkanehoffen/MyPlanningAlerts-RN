import React from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, StyleSheet, Text, Button } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const PlanningMap = ({ markers, center }) => (
  <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: center.latitude,
        longitude: center.longitude,
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

PlanningMap.propTypes = {
  markers: PropTypes.array.isRequired,
  center: PropTypes.object.isRequired,
}

export default PlanningMap