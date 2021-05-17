import React, { useState } from "react";
import { TextInput, Text, TouchableOpacity, View, ScrollView } from "react-native";
import styles from "./model/ReviewViewAndCreateStyles.js";
import { firebase } from "../firebase/config";

export default function DisplayReviewsScreen({ route, navigation }) {

  //const [reviews, setReviews] = useState(null);

  //calls reviews collection, iterates through them, prints them to console. Haven't implemented user specific reviews only yet.
    firebase.firestore().collection('reviews').get().then((querySnapshot) => {
      querySnapshot.forEach(snapshot => {
          var data = snapshot.data();          
          alert(data.title); 
          //setReviews(data.title);
          //console.log(reviews);

          //gonna leave implementing reviews in account for later, rather than rush it...getting too many performance issues and crashes         
      }
  )});
   
    return (
      <View style={styles.textAreaContainer}      
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always">
      <TextInput
       //multiline={true}
       //textAlignVertical= "top"
      value="Displayed reviews to be added here. TBA"
       editable={false}
       textAlign={'center'}
       numberOfLines={10}
       style={{ height:300, backgroundColor:'white'}}
      />
        <TouchableOpacity
          style={styles.buttonTwo}
          onPress={() => navigation.navigate("Account")}>
          <Text style={styles.buttonTitle}>Back</Text>
        </TouchableOpacity>
    </View>
      );

}
