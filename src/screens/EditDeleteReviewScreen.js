import React, { useState, useEffect } from "react";
import { Image, Text, Alert, TouchableOpacity, View, ScrollView } from "react-native";
import styles from "./model/ReviewViewAndCreateStyles";
import { firebase } from "../firebase/config";
import { TextInput } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';

export default function EditDeleteReviewScreen({ route, navigation }) {
  
 // const [review, setReview] = useState([]);
  const usersRef = firebase.firestore().collection("users"); 
  const reviewsRef = firebase.firestore().collection('reviews');
  const popAction = StackActions.pop(1); //go back one screen in stack (number represents how many screens to go back by)

    //fetches reviews from database and puts them in local array
    useEffect(() => {
      var addToReviewsArray = [];
      reviewsRef.get().then((querySnapshot) => {
        querySnapshot.forEach(snapshot => {
            if (snapshot.data().toiletID == route.params.id){
              var existingReview = snapshot.data(); 
              addToReviewsArray = ([...addToReviewsArray , existingReview]);          
            } 
        }
      )    
      setExistingReviewsArray(addToReviewsArray);
    });
    }, []); 

    //Submit review on selected toilet if logged in. If not logged in, alert and do nothing.
    const onSubmitReviewPress = () => {      
        firebase.auth().onAuthStateChanged((user) => {
        if (user) {       
          usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
          const data = document.data();

          reviewsRef.add({
            title: review,
            address: route.params.address,
            toiletID: route.params.id,
            userID: data.id,
            rating: route.params.rating,
            })
            
          setExistingReviewsArray([...existingReviewsArray , {title: review, address: route.params.address, toiletID: route.params.id, 
            userID: data.id, rating: route.params.rating}]); 
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
        if (existingReviewsArray.length) {
          navigation.navigate('DisplayReviews', existingReviewsArray);         
        }   
        else if (!existingReviewsArray.length) {
          Alert.alert (
            'No reviews found.',
            'Be the first to create a review for this toilet!');
        }      
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
            onPress={() => navigation.dispatch(popAction)}>
            <Text style={styles.buttonTitle}>Back</Text>
           </TouchableOpacity>
        </>
      );

}