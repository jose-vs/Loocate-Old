import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./model/AccountStyles.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../firebase/config";

export default function AccountScreen({ route, navigation }) {

  const {dat} = route.params;

  const onLogOutPress = () => {    
    firebase.auth().signOut()
    navigation.navigate("Login");
  }

  
  const viewMyReviewsPress = () => {

    navigation.navigate("DisplayReviews");
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
        tintColor='white'/>
      <Text style={styles.titleText}>
      Your Account
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
