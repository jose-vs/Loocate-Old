import { TextInput, Text, Alert, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import AccountCard from "./components/AccountCard";
import styles from "./model/ListStylesTwo";
import { firebase } from "../firebase/config";

export default function DisplayReviewsScreen({ route, navigation }) {

//Page used for displaying own reviews on existing account

const [reviewsArray, setReviewsArray] = useState(route.params);

  return (
    <KeyboardAvoidingView 
      style={styles.container} behavior="height">
      <ScrollView>
      </ScrollView>
      <Text 
        style={styles.superTitleText}>
        Your Reviews
      </Text>
      <Entypo
        style={styles.book}
        name="book"
        size={100}
        color="white"               
        /> 
      <ScrollView
        vertical
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={true}
        style={styles.listContainer}
        contentContainerStyle={{
          paddingBottom: 165,
        }}
      >   
        {reviewsArray.map((item, index) => {
          editedReview = item;
          return (
          <AccountCard
              name={item.name}                   
              title={item.title}  
              userID={item.userID}
              key={index}
              rating={item.rating}  
              item={item}  
              address={item.address}
              navigation={navigation} 
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
              //if there is a user logged in, retrieve them and skip having to go through login screen again
              firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                navigation.navigate("Account");
              } else {
                navigation.navigate("Login");
              }
            });
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
    </KeyboardAvoidingView>
  );
}
