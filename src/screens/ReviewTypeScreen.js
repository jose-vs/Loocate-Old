import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import styles from "./model/ReviewTypeStyles.js";
import { firebase } from "../firebase/config";
import { TextInput } from 'react-native-paper';

export default function ReviewTypeScreen({ route, navigation }) {

    const [review, setReview] = useState('')
    const reviewsRef = firebase.firestore().collection('reviews');

    const onSubmitReviewPress = () => { //add review to firebase review collection, not assigned to specific account or toilet yet
      reviewsRef.add({
      title: review
      });
      setReview('');
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
             onChangeText={(text) => setReview(text)}
            underlineColorAndroid="transparent"
          />
          
          <TouchableOpacity
            style={styles.buttonTwo}
            onPress={() => onSubmitReviewPress()}> 
            <Text style={styles.buttonTitle}>Submit review</Text>
      
           </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonTwo}
            onPress={() => navigation.navigate("Account")}>
            <Text style={styles.buttonTitle}>Back</Text>
           </TouchableOpacity>
        </>
      );

}
