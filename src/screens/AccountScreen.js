import React, { useState, useEffect, useRef } from "react";
import { Image, Text, ActivityIndicator, TouchableOpacity, View, Alert } from "react-native";
import styles from "./model/AccountStyles.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../firebase/config";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";

export default function AccountScreen({ navigation }) {

  const [existingReviewsArray, setExistingReviewsArray] = useState([]);
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const reviewsFetched = useRef(false);
  const [userr, setUserr] = useState();

  //clean up useEffect, unmounting on auth changed listener...
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => { // detaching the listener 
      if (user) {
        setUserr(user);
      }
      else {
        setUserr(null);
      }
    });
    return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting
  }, []);

  // Create a useEffect [with no dependencies] that runs once to get the userId
  useEffect(() => {   
    firebase.auth().onAuthStateChanged((user) => {
      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(user.uid)
        .get()
        .then((document) => {
          const data = document.data();

          // Use the set state hook here to trigger the second useEffect below
          setUserId(data.id);
        });
    });
  }, []);

  //get reviews made by userID to useState, listens to changes in userID state
  useEffect(() => {  
    let addToReviewsArray = [];
    const reviewsRef = firebase.firestore().collection("reviews");

    reviewsRef.get().then((querySnapshot) => {
      querySnapshot.forEach(snapshot => {
          if (snapshot.data().userID == userId){
            var existingReview = snapshot.data(); 
            addToReviewsArray = ([...addToReviewsArray , existingReview]);          
          } 
      }
    )    
      setExistingReviewsArray(addToReviewsArray);      
      reviewsFetched.current = true;
    });
    
  }, [userId]); 

  //keeps page loading till review data is collected
  useEffect(() => {
    if (reviewsFetched.current == true)
    {
      setIsLoading(false);
    }
  }, [reviewsFetched.current])

  const onLogOutPress = () => {    
    firebase.auth().signOut()
    navigation.navigate("Login");
  }
 
  const viewMyReviewsPress = () => {
    if (isLoading) {

    }
    else {
      if (existingReviewsArray.length) {
        navigation.navigate('DisplayReviews', existingReviewsArray);         
      }   
      else if (!existingReviewsArray.length) {
        Alert.alert (
          'No reviews found.',
          'Submit reviews on toilets and they will be viewable here.');
      }      
    } 
  }

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator style={styles.loading} 
      size="large" color="white"/> : <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%"}}
        keyboardShouldPersistTaps="always"
        scrollEnabled={false}
        >
        <Image
          style={styles.logo}
          source={require('../../assets/loocate_icon.png')}
          tintColor='white'
        />
      <Text style={styles.titleText}>
        Your Account
      </Text>
        <TouchableOpacity 
          style={styles.buttonTwo} onPress={() => viewMyReviewsPress()}>
          <Text style={styles.buttonTitle}>
            My reviews
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonTwo}
          onPress={() => navigation.navigate("Map")}>
          <Text style={styles.buttonTitle}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onLogOutPress()}>
          <Text style={styles.buttonTitle}>Log out</Text>
        </TouchableOpacity>       
      </KeyboardAwareScrollView>}     
    </View>
  );
}
