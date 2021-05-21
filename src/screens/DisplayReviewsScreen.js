import { TextInput, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { firebase } from "../firebase/config";
import React, { useEffect, useState } from "react";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import ReviewCard from "./components/ReviewCard";
import styles from "./model/ListStyles";
import { initialViewReviewsState} from "./model/ViewReviewsData";

export default function DisplayReviewsScreen({ route, navigation }) {

  //need to have two sections on this component...one for your own reviews, that you'd view on your account..and one for all reviews 
  //for a single toilet...

  //I want to fetch each review that are of the current toilet being looked at, and add them to their own array. I then want to 
  //use the map in the reviewcard section to iterate through these and display them on the cards, similar to listscreen.

//const arrayOfReviews = [null];
const [state, setState] = useState(initialViewReviewsState);
//const [arrayOfReviews, setarrayOfReviews] = useState(toilet);

useEffect(() => {
firebase.firestore().collection('reviews').get().then((querySnapshot) => {
  querySnapshot.forEach(snapshot => {
      if (snapshot.data().toiletID == route.params.id){
        var review = snapshot.data(); 
        console.log(review) 
        state.reviews.push(review);
        console.log(state.reviews.title)      
        //alert(data.title); 
      }  
  }
)});
}, []);


  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#777"
          autoCapitalize="none"
          style={styles.searchBoxText}
        />
        <FontAwesome
          name="search"
          size={24}
          color="black"
          style={{ right: 8, opacity: 0.6 }}
        />
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{
          // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === "android" ? 20 : 0,
        }}
      >

      </ScrollView>

      <ScrollView
        vertical
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={true}
        style={styles.listContainer}
      >
        {state.reviews.map((item, index) => {
          return (
          <ReviewCard 
            key={index}
            review={item.title} //need to make this item.title, but is undefined.
          />
          )          
        })}
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        {/* MAP BUTTON */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Map");
          }}
        >
          <Entypo
            name="map"
            size={24}
            color="white"
            style={styles.footerButton}
          />
        </TouchableOpacity>
        {/* LIST SCREEN */}
        <TouchableOpacity
          onPress={() => {
            //navigates to listscreen when pressed
            //navigation.navigate("List");
          }}
        >
          <Entypo
            name="list"
            size={24}
            color="white"
            style={styles.footerButton}
          />
        </TouchableOpacity>
        {/* USER SCREEN */}
        <TouchableOpacity
          onPress={() => {
            //navigates to loginscreen when pressed
            navigation.navigate("Login");
          }}
        >
          <FontAwesome
            name="user"
            size={24}
            color="white"
            style={styles.footerButton}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
