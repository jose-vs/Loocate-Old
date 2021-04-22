import React, { useEffect, useState } from "react";
import {
  Animated,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Animatable from "react-native-animatable";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { MAP_API_KEY } from "@env";
import toiletApi from "../../api/googlePlaces";
import StarRating from "./components/StarRating";
import { initialMapState } from "./model/MapData";
import { styles } from "./model/Styles";
import {
  SPACING_FOR_CARD_INSET,
  CARD_HEIGHT,
  CARD_WIDTH,
} from "./model/Constants";
//import Map_TopMenu from "./components/Map_TopMenu";

const MapScreen = (props) => {
  const [state, setState] = useState(initialMapState);

  //fetch the api 
  useEffect(() => {
    toiletApi
      .get(
        `&location=
          ${state.region.latitude}, ${state.region.longitude}
        &radius=
          ${state.radius}
        &keyword=toilet
        &key=${MAP_API_KEY}`
      )
      .then((response) => {
        console.log(response.data)
        response.data.results.map((toiletData) => {
          const newToilet = {
            coordinate: {
              latitude: toiletData.geometry.location.lat,
              longitude: toiletData.geometry.location.lng,
            },
            title: toiletData.name,
            address: toiletData.vicinity,
            image: require("../../assets/ToiletPhotos/toilet1.jpg"),
            rating: toiletData.rating,
            reviews: toiletData.user_ratings_total,
          };

          console.log(newToilet);
          state.markers.push(newToilet);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  let mapIndex = 0; // which map is currently selected in the list
  let mapAnimation = new Animated.Value(0); 
  let scrollViewHeight = new Animated.Value(0);

  // deals with the animation for the markers 
  // render each time the dom changes
  useEffect(() => {
    mapAnimation.addListener(({ value }) => { // value represents the index of the current item
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      //animate our map to the index position
      const regionTimeout = setTimeout(() => {
        // animate if it index matches the mapindex
        if (mapIndex !== index) {
          mapIndex = index;
          //get coordinates from markers from index then animate to that region
          const { coordinate } = state.markers[index];

          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  useEffect(() => {
    var toValue = state.showPublicToilets ? 0 : CARD_HEIGHT + 10;

    Animated.timing(scrollViewHeight, {
      toValue: toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [state.showPublicToilets]);

  //animations to each respective map marker 

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    //change the scale of each selected marker
    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1], //start with a scale of 1 then 1.5 and return to 1
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => { // get the event data on press
  
    const markerID = mapEventData._targetInst.return.key; // get the markerID of the event data
    console.log(markerID);
    let toiletinfo = state.markers[markerID];
    console.log(toiletinfo);
    props.navigation.navigate('Toilet', toiletinfo);
    //position our card elements
    /*let x = markerID * CARD_WIDTH + markerID * 20; // fetch the x value of the card element
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET; //update x with the card inset value for ios devices
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });*/
  };

  //decides which components on the screen to show based on 
  //the current state when the user clicks anywhere on the map screen
  const hideComponents = () => {
    if (state.showPublicToilets) {
      setState({ ...state, showPublicToilets: false });
    } else if (!state.showPublicToilets) {
      setState({ ...state, showPublicToilets: true });
    }
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        onPress={() => {
          hideComponents();
        }}
      >
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: state.showPublicToilets
                  ? interpolations[index].scale
                  : 1,
              },
            ],
          };
          return (
            <MapView.Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={(e) => {onMarkerPress(e);}}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require("../../assets/pin.png")}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
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

        {/* 
          look through every item in the filter and display them 
          as chip items
        */}
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

      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={[styles.scrollView, { translateY: scrollViewHeight }]}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        
        // handles animation when scrolling through the list
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation, 
                },
              },
            },
          ],
          { useNativeDriver: true } // using native animation
        )}
      >
        {/* 
          map through each toilet element and display it 
        */}
        {state.markers.map((marker, index) => (
          <Animatable.View
            animation="slideInUp"
            iterationCount={1}
            style={styles.card}
            key={index}
          >
            <Image
              source={marker.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.title}
              </Text>
              <StarRating ratings={marker.rating} reviews={marker.reviews} />
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.address}
              </Text>
            </View>
          </Animatable.View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default MapScreen;
