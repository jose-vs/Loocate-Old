import * as React from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const { useState, useEffect } = React;
export default function MapScreen() {
  const [locationResult, setLocation] = useState(null);
  const [mapRegion, setRegion] = useState(null);
  const [hasLocationPermissions, setLocationPermission] = useState(false);
  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if ("granted" !== status) {
        setLocation("Permission to access location was denied");
      } else {
        setLocationPermission(true);
      }
      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      setLocation(JSON.stringify({ latitude, longitude }));
      // Center the map on the location we just fetched.
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };
    getLocationAsync();
  });
  if (locationResult === null) {
    return <Text style={styles.header}>Finding your current location...</Text>;
  }
  if (hasLocationPermissions === false) {
    return <Text>Location permissions are not granted.</Text>;
  }
  if (mapRegion === null) {
    return <Text>Map region doesn't exist.</Text>;
  }
  return (
    <MapView
      style={styles.container}
      region={mapRegion}
      initialRegion={{
        latitude: 39.97343096953564,
        latitudeDelta: 0.0922,
        longitude: -75.12520805829233,
        longitudeDelta: 0.0421,
      }}
      onRegionChange={(region) => setRegion(region)}
    >
      <MapView.Marker
        title="YIKES, Inc."
        description="Web Design and Development"
        coordinate={{ latitude: 39.969183, longitude: -75.133308 }}
      />
    </MapView>
  );
}
MapScreen.navigationOptions = {
  header: null,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: 100,
  },
});
