import { TextInput, Text, Alert, TouchableOpacity, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import ReviewCard from "./components/ReviewCard";
import styles from "./model/ListStyles";
import { StackActions } from '@react-navigation/native';

export default function DisplayReviewsScreen({ route, navigation }) {

//this page should only be for reviews viewed on a specific toilet. Viewing reviews on account needs to be done differently...

  //I want to fetch each review that are of the current toilet being looked at, and add them to their own array. I then want to 
  //use the map in the reviewcard section to iterate through these and display them on the cards, similar to listscreen.

const [reviewsArray, setReviewsArray] = useState(route.params);

useEffect(() => {
  
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
        {reviewsArray.map((item, index) => {
          return (
          <ReviewCard 
            title={item.title}   
            key={index}
            address={item.address}
            loocateRating = {item.loocateRating}
            rating={item.rating}                
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
            navigation.navigate("List");
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
