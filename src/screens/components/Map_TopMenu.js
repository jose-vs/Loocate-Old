import React from "react";
import {
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";

import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

import { styles } from "../model/Styles";

const Map_TopMenu = ({state}) => {
  return (
    <View style = {{flex: 1}}>
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

        {state.filter.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem}>
            <Text>{category.type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        {/* Map Style Button */}
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.circleButton}>
            <MaterialIcons
              name="layers"
              size={26}
              color="black"
              style={{ top: 6, left: 6, opacity: 0.6 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Map_TopMenu;
