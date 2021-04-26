import React, { useEffect, useState } from "react";
import {
  Animated,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Animatable from "react-native-animatable";
import { FontAwesome, MaterialIcons, Entypo } from "@expo/vector-icons";
import { MAP_API_KEY } from "@env";
import toiletApi from "../../api/googlePlaces";
import { initialMapState } from "./model/MapData";
import { styles } from "./model/MapStyles";
import StarRating from "./components/StarRating";
import { CARD_WIDTH } from "./model/Constants";
import BottomSheet from "reanimated-bottom-sheet";

//import Map_TopMenu from "./components/Map_TopMenu";

export default function MapScreen({navigation}) {
  const [state, setState] = useState(initialMapState);
  const [searchNewArea, setNewArea] = useState(false);
  const [areaLoad, setAreaLoad] = useState(true);

  //fetch the api
  useEffect(() => {
    setAreaLoad((current) => false);
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
        //console.log(response.data)
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

          //console.log(newToilet);
          state.markers.push(newToilet);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [areaLoad]);

  useEffect(() => {
    setNewArea((current) => true);
  }, [state.region]);

  const onAreaSearchPress = () => {
    setState({ ...state, markers: [] });
    setNewArea((current) => false);
    setAreaLoad((current) => true);
  };

  let mapAnimation = new Animated.Value(0);

  // deals with the animation for the markers
  // render each time the dom changes
  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      // value represents the index of the current item
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
      }, 10);
    });
  });

  const [marker, setMarker] = useState();

  const onMarkerPress = (mapEventData) => {
    // get the event data on press
    const markerID = mapEventData._targetInst.return.key; // get the markerID of the event data
    console.log(state.markers[markerID]);
    setMarker(markerID);
    bs.current.snapTo(0);
  };

  const onMapStyleButtonPress = () => {
    if (state.mapType == "standard") {
      setState({ ...state, mapType: "satellite" });
    } else if (state.mapType == "satellite") {
      setState({ ...state, mapType: "standard" });
    }
  };

  //creates bottomsheet content
  const bs = React.createRef();
  renderHeader = () => (
    <View style={styles.panelHeader}>
      <View style={styles.panelHandle} />
    </View>
  );

  renderInner = () => (
    <View style={styles.bottomPanel}>
      {marker &&
        marker.length && ( //check for null in useState otherwise crash on startup as undefined
          <Text style={styles.toiletTitle}>{state.markers[marker].title}</Text>
        )}
      {marker && marker.length && (
        <Text style={styles.toiletSubtitle}>
          {state.markers[marker].address}
        </Text>
      )}
      <View style={styles.hairline} />
      {marker && marker.length && (
        <Text style={styles.textSubheading}>Get Directions</Text>
      )}
      {marker && marker.length && (
        <Text style={styles.textSubheading}>
          Rating: <StarRating ratings={state.markers[marker].rating} />
        </Text>
      )}
      {marker && marker.length && (
        <Text style={styles.textSubheading}>
          Reviews: {state.markers[marker].reviews}
        </Text>
      )}
    </View>
  );

  const _map = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        mapType={state.mapType}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        onRegionChangeComplete={(region) =>
          setState({ ...state, region: region })
        }
        onPress={() => {}}
      >
        {state.markers.map((marker, index) => {
          return (
            <MapView.Marker
              key={index}
              tracksViewChanges={false}
              coordinate={marker.coordinate}
              onPress={(e) => {
                onMarkerPress(e);
              }}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require("../../assets/pin.png")}
                  style={styles.marker}
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
      <Animatable.View style={styles.searchHere} animation="fadeInLeft">
        <TouchableOpacity
          onPress={() => {
            onAreaSearchPress();
          }}
        >
          <Text style={styles.searchHereText}>Search this area</Text>
        </TouchableOpacity>
      </Animatable.View>

      <View style={styles.buttonContainer}>
        {/* Map Style Button */}
        <TouchableOpacity
          onPress={() => {
            onMapStyleButtonPress();
          }}
        >
          <View style={styles.circleButton}>
            <MaterialIcons
              name="layers"
              size={26}
              color="black"
              style={{ top: 6, left: 6, opacity: 0.6 }}
            />
          </View>
        </TouchableOpacity>

        {/* FOOTER */}
      </View>
      <View style={styles.footer}>
        {/* MAP BUTTON */}
        <TouchableOpacity onPress={() => {}}>
          <Entypo
            name="map"
            size={24}
            color="white"
            style={styles.footerButton}
          />
        </TouchableOpacity>
        {/* LIST SCREEN */}
        <TouchableOpacity onPress={() => {}}>
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
      <BottomSheet
        ref={bs}
        snapPoints={[320, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        borderRadius={10}
        initialSnap={1}
        borderRadius={10}
        enabledGestureInteraction={true}
      />
    </View>
  );
};


