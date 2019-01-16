import React from "react";
import PropTypes from "prop-types";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  Alert
} from "react-native";
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

class PlanningMap extends React.Component {
  static propTypes = {
    markers: PropTypes.array.isRequired,
    center: PropTypes.object.isRequired,
    radius: PropTypes.number.isRequired
  };

  /**
   * Focus on a specific map location
   * This is called via a ref in PlanningAppListItem to focus on selected PA.
   * @param lat
   * @param lon
   * @param radius
   */
  animateCamera(lat, lon, radius) {
    console.log("doing animateCamera", lat, lon, radius);
    this.map.animateToRegion(regionFrom(lat, lon, radius));
  }

  render() {
    const { markers, center, radius } = this.props;
    const region = regionFrom(center.latitude, center.longitude, radius * 1000);
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          ref={ref => (this.map = ref)}
        >
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
          <Marker
            coordinate={center}
            image={require("../assets/homePin.png")}
          />
        </MapView>
      </View>
    );
  }
}

export default PlanningMap;
