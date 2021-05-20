import { TextInput, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { firebase } from "../firebase/config";
import React, { useState } from "react";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import ReviewCard from "./components/ReviewCard";
import styles from "./model/ListStyles";

export default function DisplayReviewsScreen({ route, navigation }) {

  //need to have two sections on this component...one for your own reviews, that you'd view on your account..and one for all reviews 
  //for a single toilet...

  const [toiletReviews, setToiletReviews] = useState(route.params);

  firebase.firestore().collection('reviews').get().then((querySnapshot) => {
    querySnapshot.forEach(snapshot => {
        if (snapshot.data().toiletID == route.params.id){
          var data = snapshot.data();          
          alert(data.title); 
        }  
    }
)});
   
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
        {toilets.map((item, index) => {
          return (
          <ReviewCard 
            key={index}
            ratings={item.rating}
            reviews={item.reviews}
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

  /*
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
      */

}
