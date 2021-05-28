import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import ToiletCard from "./components/ToiletCard";
import styles from "./model/ListStyles";
import { filter } from "./model/MapData";

export default ListScreen = ({ route, navigation }) => {
  const [toilets, setToilets] = useState(route.params);
  const filterPress = (filter) => {
    const sorted = [...toilets];

    switch (filter) {
      case "nearest":
        setToilets(sorted.sort((a, b) => (a.distance > b.distance ? 1 : -1)));
        break;
      case "top rated":
        setToilets(sorted.sort((a, b) => (a.rating < b.rating ? 1 : -1)));
        break;
      case "most reviewed":
        setToilets(sorted.sort((a, b) => (a.reviews < b.reviews ? 1 : -1)));
        break;
      case "open now":
        break;
    }
  };

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
        <TouchableOpacity style={styles.circleButton}>
          <Ionicons
            name="filter"
            size={26}
            color="black"
            style={{ top: 7, left: 7, opacity: 0.6 }}
          />
        </TouchableOpacity>

        {filter.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.chipsItem}
            onPress={() => {
              filterPress(category.type);
            }}
          >
            <Text>{category.type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        vertical
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={true}
        style={styles.listContainer}
      >
        {toilets.map((item, index) => {
          return (
            <ToiletCard
              key={index}
              title={item.title}
              address={item.address}
              ratings={item.rating}
              reviews={item.reviews}
              item={item}
              navigation={navigation}
            />
          );
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
    </View>
  );
};
