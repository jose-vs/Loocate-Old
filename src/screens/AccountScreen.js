import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./model/AccountStyles.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../firebase/config";

export default function AccountScreen({ navigation }) {

  const onLogOutPress = () => {
    var user = firebase.auth().currentUser;
    console.log(user); //print user details to console, mainly for testing purposes
    firebase.auth().signOut(); //sign out user not working at the moment
    navigation.navigate("Map");
  };

  const viewMyReviewsPress = () => {
    //go to reviews, use scrollview maybe
  }

  const createReviewsPress = () => {
    navigation.navigate("ReviewType");
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always">
        <Image
        style={styles.logo}
        source={require('../../assets/loocate_icon.png')}
        tintColor='grey'/>
      <Text style={styles.titleText}>
      Your Account, retrieve user's name from database
      </Text>
        <TouchableOpacity style={styles.buttonTwo} onPress={() => viewMyReviewsPress()}>
          <Text style={styles.buttonTitle}>View my reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonTwo} onPress={() => createReviewsPress()}>
          <Text style={styles.buttonTitle}>Create review (temporarily here)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonTwo}
          onPress={() => navigation.navigate("Map")}>
          <Text style={styles.buttonTitle}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onLogOutPress()}>
          <Text style={styles.buttonTitle}>Log out</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
