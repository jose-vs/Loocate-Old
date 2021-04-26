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
import ToiletCard from './components/ToiletCard'
import styles from "./model/ListStyles";
import { filter } from "./model/MapData";
import { Item } from "native-base";

export default ListScreen = ({ navigation  }) => {
    const testList = [
        'bruh', 
        'bruhbruh', 
        'bruhbruhbruh',
        'gilfoyle'
    ]

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
          <TouchableOpacity key={index} style={styles.chipsItem}>
            <Text>{category.type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style = {styles.listContainer}>
            {testList.map((item, index) => { 
                return (
                    <ToiletCard
                        key={index}
                        text={item}
                    />
                )
            })}
      </View>


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
};
