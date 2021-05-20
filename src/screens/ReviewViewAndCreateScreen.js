import React, { useState } from "react";
import { Image, Text, Alert, TouchableOpacity, View, ScrollView } from "react-native";
import styles from "./model/ReviewViewAndCreateStyles";
import { firebase } from "../firebase/config";
import { TextInput } from 'react-native-paper';

export default function ReviewViewAndCreateScreen({ route, navigation }) {

    let review = ('');
    let userInput = ('');
    const reviewsRef = firebase.firestore().collection('reviews');

    //Submit review on selected toilet if logged in. If not logged in, alert and do nothing.
    const onSubmitReviewPress = () => {      
      firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        console.log(userInput)

        const usersRef = firebase.firestore().collection("users"); 
        usersRef
        .doc(user.uid)
        .get()
        .then((document) => {
        const data = document.data();
        
        reviewsRef.add({
          title: review,
          toiletID: route.params.id,
          userID: data.id 
          });
      })
      Alert.alert(
        'Submission success',
        'Your review has been placed.'); 
      } 
      else {
        Alert.alert(
          'Authentication required',
          'You must be logged in to place a review.');  
        navigation.navigate('Login');      
      }
    });
    }

    /* view all reviews associated with toilet. Is how it was implemented last sprint for now, but only displays
     * reviews associated with toilet this time. Need to implement validation for if there are no reviews.
    */
    const onViewReviewPress = () => { 
      navigation.navigate('DisplayReviews', route.params);
    }

    return (
        <>
          <TextInput onChangeText={() => {}}        
            style={{ height:100, backgroundColor:'white'}}
            placeholder='Write your review here:'
            placeholderTextColor="#aaaaaa"
            multiline={true}          
            numberOfLines={10}
            textAlign=''
             onChangeText={(userInput) => review = (userInput)}
            underlineColorAndroid="transparent"
          />

          <TouchableOpacity
            style={styles.buttonTwo}
            onPress={() => onViewReviewPress()}> 
            <Text style={styles.buttonTitle}>View reviews</Text>
            </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonTwo}
            onPress={() => onSubmitReviewPress()}> 
            <Text style={styles.buttonTitle}>Submit review</Text>
      
           </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonTwo}
            onPress={() => navigation.navigate("Map")}>
            <Text style={styles.buttonTitle}>Back</Text>
           </TouchableOpacity>
        </>
      );

}
