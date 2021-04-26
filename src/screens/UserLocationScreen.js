import React from "react";
import { Button, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

export default function UserLocationScreen({navigation}) {

    const requestUserLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "User location permission",
              message:
                "Loocate needs access to your location" +
                " so your route to toilets can be determined.",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) { //need to adjust so it doesnt automatically approve either way.
            console.log("ACCESS_FINE_LOCATION permission approved.");
            navigation.navigate('Map');
          } else {
            console.log("ACCESS_FINE_LOCATION permission denied.");
          }
        } catch (err) {
          console.warn(err);
        }
      };

    return (
                  <View style={styles.container}>
    <Text style={styles.item}>To use this app, please click the button below:</Text>
    <Button title="User location permissions" onPress={requestUserLocationPermission} />
  </View>
  
    )}

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center",
          paddingTop: StatusBar.currentHeight,
          backgroundColor: "#ecf0f1",
          padding: 8
        },
        item: {
          margin: 24,
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center"
        }
      });