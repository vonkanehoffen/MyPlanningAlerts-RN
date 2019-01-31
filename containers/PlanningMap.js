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

// Note: PureComponent because that means shouldComponentUpdate is based on a shallow diff.
// ...which stops the map re-rendering for no good reason.
class PlanningMap extends React.PureComponent {
  static propTypes = {
    markers: PropTypes.array.isRequired,
    center: PropTypes.object.isRequired,
    radius: PropTypes.number.isRequired,
    selectPA: PropTypes.func.isRequired
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

  componentDidUpdate(prevProps) {
    // Note: this has to happen here as oppose to onMapReady because of a bug:
    // https://github.com/react-native-community/react-native-maps/issues/180
    // ...although it's kinda good as the map will auto centre when new pins are added.
    if (prevProps.markers !== this.props.markers) {
      console.log("PlanningMap doing fitToElements");
      this.map.fitToElements(true);
    }
  }

  render() {
    const { markers, center, radius, selectPA } = this.props;
    const region = regionFrom(center.latitude, center.longitude, radius * 1000);
    console.log("planning map rendering");
    console.log("region", region);
    console.log("markers", markers);
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          ref={ref => (this.map = ref)}
        >
          {markers.map((marker, i) => {
            if (!marker.coordinates) return false;

            const latitude = marker.coordinates._latitude;
            const longitude = marker.coordinates._longitude;

            return (
              <Marker
                coordinate={{ latitude, longitude }}
                title={marker.apps[0].title}
                key={i}
                onPress={() => selectPA(i)}
              />
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
