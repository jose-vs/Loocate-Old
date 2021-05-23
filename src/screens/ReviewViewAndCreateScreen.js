import React, { useState } from "react";
import { Image, Text, Alert, TouchableOpacity, View, ScrollView } from "react-native";
import styles from "./model/ReviewViewAndCreateStyles";
import { firebase } from "../firebase/config";
import { TextInput } from 'react-native-paper';

export default function ReviewViewAndCreateScreen({ route, navigation }) {

    let review = ('');
    let userInput = ('');
    let existingReviewArray = [];
    const reviewsRef = firebase.firestore().collection('reviews');

    //Submit review on selected toilet if logged in. If not logged in, alert and do nothing.
    const onSubmitReviewPress = () => {      
      firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const usersRef = firebase.firestore().collection("users"); 
        usersRef
        .doc(user.uid)
        .get()
        .then((document) => {
        const data = document.data();
        
        reviewsRef.add({
          title: review,
          toiletID: route.params.id,
          userID: data.id,
          rating: 0 //add in star rating variable when I get around to it...
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

    /* Retrieves review for current toilet selected and puts them in an array. Array is sent to DisplayReviewsScreen while navigating
     * so that they can be rendered in the useState.
    */
    const onViewReviewPress = () => { 
      navigation.navigate('DisplayReviews', existingReviewArray);
    }

    const testdata = () => {
      reviewsRef.get().then((querySnapshot) => {
        querySnapshot.forEach(snapshot => {
            if (snapshot.data().toiletID == route.params.id){
              var existingReview = snapshot.data(); 
              existingReviewArray = [...existingReviewArray, existingReview]
            } 
        }
      )});
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
            onPress={() => testdata()}>
            <Text style={styles.buttonTitle}>Back</Text>
           </TouchableOpacity>
        </>
      );

}
