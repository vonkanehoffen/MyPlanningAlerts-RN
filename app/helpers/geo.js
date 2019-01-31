/**
 * Get Google map region object
 * Centred on coordinates with a specified zoom level.
 * See https://github.com/react-native-community/react-native-maps/issues/505#issuecomment-301308736
 * @param lat
 * @param lon
 * @param distance -  metres
 * @returns {{latitude: *, longitude: *, latitudeDelta: number, longitudeDelta: number}}
 */
export function regionFrom(lat, lon, distance) {
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;

  const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
  const longitudeDelta =
    distance / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

  return {
    latitude: lat,
    longitude: lon,
    latitudeDelta,
    longitudeDelta
  };
}
