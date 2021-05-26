import React, { useEffect, useState } from "react";
import {
  Animated,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Animatable from "react-native-animatable";
import {
  FontAwesome,
  MaterialIcons,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { MAP_API_KEY } from "@env";
import toiletApi from "../../api/googlePlaces";
import distanceMatrixApi from "../../api/distanceMatrixApi";
import {
  initialMapState,
  toilet,
  mapDarkStyle,
  mapStandardStyle,
} from "./model/MapData";
import { styles } from "./model/MapStyles";
import StarRating from "./components/StarRating";
import { CARD_WIDTH } from "./model/Constants";
import BottomSheet from "reanimated-bottom-sheet";
import * as Location from "expo-location";
import { firebase } from "../firebase/config";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoding";

export default MapScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [state, setState] = useState(initialMapState);
  const [toilet, setToilet] = useState(toilet);
  const [grantedPerms, setPerms] = useState(null);

  const _map = React.useRef(null);
  Geocoder.init(MAP_API_KEY);
  /**
   * Loads the user location
   */
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      //save the location into the map state value for use
      setState({
        ...state,
        userLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
      toiletApiFetch(location.coords.latitude, location.coords.longitude);
      setPerms(true);
    })();
  }, []);

  toiletApiFetch = async (lat, lng) => {
    const fetchedToilets = [];

    await toiletApi
      .get(
        `&location=
            ${lat}, ${lng}
          &radius=
            ${state.radius}
          &keyword=toilet
          &key=${MAP_API_KEY}`
      )
      .then(async (response) => {
        await response.data.results.map((toiletData) => {
          const newToilet = {
            id: toiletData.place_id,
            coordinate: {
              latitude: toiletData.geometry.location.lat,
              longitude: toiletData.geometry.location.lng,
            },
            title: toiletData.name,
            address: toiletData.vicinity,
            rating: toiletData.rating,
            reviews: toiletData.user_ratings_total,
            distance: null,
            duration: null,
          };

          fetchedToilets.push(newToilet);
        });
      })
      .catch((err) => console.log("Error:", err));

    Promise.all(
      fetchedToilets.map(async (current) => {
        return await distanceApiFetch(current)
          .then((result) => {
            return result;
          })
          .catch((errorMessage) => {
            return Promise.reject(errorMessage);
          });
      })
    )
      .then((result) => {
        setState({ ...state, markers: result });
      })
      .catch((errorMessage) => {
        return Promise.reject(errorMessage);
      });
  };

  const distanceApiFetch = async (toilet) => {
    return await distanceMatrixApi
      .get(
        `&origins=
      ${state.userLocation.latitude},${state.userLocation.longitude}
      &destinations=
      ${toilet.coordinate.latitude},${toilet.coordinate.longitude}
      &key=${MAP_API_KEY}`
      )
      .then(async (response) => {
        return await Promise.resolve({
          id: toilet.id,
          coordinate: toilet.coordinate,
          title: toilet.title,
          address: toilet.address,
          rating: toilet.rating,
          reviews: toilet.reviews,
          distance: response.data.rows[0].elements[0].distance.value / 1000,
          duration: response.data.rows[0].elements[0].duration.value / 60,
        });
      })
      .catch((err) => {
        return Promise.reject(`Error on GMAPS route request: ${err}`);
      });
  };

  const onLoginPress = () => {
    //if there is a user logged in, retrieve them and skip having to go through login screen again
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //if user is signed in
        const usersRef = firebase.firestore().collection("users"); //get user collection from firestore
        usersRef //call the database of user data (NOT the users in auth())
          .doc(user.uid)
          .get()
          .then((document) => {
            const data = document.data(); //this is the specific data (not userAuth, but the data I made in the users collection) of the user
            navigation.navigate("Account", { user: data }); //revisit this later, accessing data on account screen is of issue
          });
      } else {
        navigation.navigate("Login");
      }
    });
  };

  /**
   * saves the current selected toilets coordinates
   * into the current map state to for use in
   * react native maps directions
   */
  const onGetDirectionsPress = () => {
    setState({ ...state, selectedToiletDest: toilet.coordinate });
    bs.current.snapTo(1);
  };

  //Navigates to review screen and takes current toilet being accessed there to have its reviews manipulated.
  const onReviewPress = () => {
    navigation.navigate("ReviewViewAndCreate", toilet);
  };

  /**
   * list will be updated based on the current region the
   * user is at on the map
   */
  const onAreaSearchPress = () => {
    toiletApiFetch(state.region.latitude, state.region.longitude);
  };

  let mapAnimation = new Animated.Value(0);

  /**
   * deals with the animation for the markers
   * renders each time the dom changes
   */
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

  const RenderMarkers = () => {
    if (state.markers === undefined || state.markers == 0) {
      return null;
    } else {
      return state.markers.map((marker, index) => {
        return (
          <Marker
            onLoad={() => this.forceUpdate()}
            key={index}
            tracksViewChanges={false}
            coordinate={marker.coordinate}
            onPress={(e) => {
              onMarkerPress(e);
            }}
          >
            <View style={styles.markerWrap}>
              <Image
                source={require("../../assets/pin.png")}
                style={styles.marker}
              />
            </View>
          </Marker>
        );
      });
    }
  };
  const [marker, setMarker] = useState();

  /**
   * gets the current selected marker and saves its information
   * in a usestate for later use
   */
  const onMarkerPress = (mapEventData) => {
    // get the event data on press
    const markerID = mapEventData._targetInst.return.key;
    setToilet(state.markers[markerID]);
    setMarker(markerID);
    bs.current.snapTo(0);
  };

  /**
   * handles which map style will be shown
   * by updating the state variable 'mapType'
   *
   * maptype is passed through react native maps
   */
  const onMapStyleButtonPress = () => {
    if (state.mapType == "standard") {
      setState({ ...state, mapType: "satellite" });
    } else if (state.mapType == "satellite") {
      setState({ ...state, mapType: "standard" });
    }
  };
  // Make change into light and dark mode
  const onStyleButtonPress = () => {
    if (state.mapType == "standard") {
      setState({ ...state, mapType: "satellite" });
    } else if (state.mapType == "satellite") {
      setState({ ...state, mapType: "standard" });
    }
  };

  const onLocationButtonPress = () => {
    if (state.userLocation != null) {
      _map.current.animateToRegion(
        {
          latitude: state.userLocation.latitude,
          longitude: state.userLocation.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        },
        350
      );
    } else {
      console.log("No user location given (PERMISIONS MAY NOT BE GIVEN");
    }
  };

  /**
   * creates bottom sheet content
   */
  const bs = React.createRef();
  renderHeader = () => (
    <View style={styles.panelHeader}>
      <View style={styles.panelHandle} />
    </View>
  );

  renderInner = () => (
    <View style={styles.bottomPanel}>
      {marker && marker.length && (
        <Text
          style={
            styles.toiletTitle //check for null in useState otherwise crash on startup as undefined
          }
        >
          {toilet.title}
        </Text>
      )}
      {marker && marker.length && (
        <Text style={styles.toiletSubtitle}>{toilet.address}</Text>
      )}
      <View style={styles.hairline} />
      {marker && marker.length && (
        <TouchableOpacity onPress={() => onGetDirectionsPress()}>
          <Text style={styles.textSubheading}>Get Directions</Text>
        </TouchableOpacity>
      )}
      {marker && marker.length && (
        <Text style={styles.textSubheading}>
          Rating: <StarRating ratings={toilet.rating} />
        </Text>
      )}
      {marker && marker.length && (
        <TouchableOpacity onPress={() => onReviewPress()}>
          <Text style={styles.textSubheading}>Reviews: {toilet.reviews}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (state.userLocation.latitude) {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SafeAreaView style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
              placeholder="Search"
              listViewDisplayed="auto"
              fetchDetails={true}
              minLength={2}
              debounce={200}
              onPress={(data, details = null) => {
                _map.current.animateToRegion(
                  {
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.05,
                  },
                  350
                );
                toiletApiFetch(
                  details.geometry.location.lat,
                  details.geometry.location.lng
                );
              }}
              query={{
                key: MAP_API_KEY,
                language: "en",
              }}
              styles={{
                textInputContainer: {
                  width: "95%",
                  position: "absolute",
                  //borderRadius: 40,
                  padding: 10,
                  alignSelf: "center",
                  height: 40,
                },
                textInput: {
                  height: 40,
                  color: "black",
                  fontSize: 16,
                  paddingLeft: 15,
                  borderRadius: 25,
                },
                listView: {
                  zIndex: 2,
                  width: "90%",
                  position: "absolute",
                  marginTop: 60,
                  padding: 10,
                  alignSelf: "center",
                  backgroundColor: "white",
                  borderRadius: 25,
                  elevation: 1,
                },
                separator: {
                  opacity: 0,
                },
              }}
            />
          </SafeAreaView>
        </View>
        <MapView
          ref={_map}
          showuserLocation={true} // may not be needed, deprecated by 'showsuserlocation={true}'
          loadingEnabled={true}
          loadingIndicatorColor="#75CFB8"
          loadingBackgroundColor="#fff"
          showsCompass={false}
          showsPointsOfInterest={false}
          initialRegion={{
            latitude: state.userLocation.latitude,
            longitude: state.userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType={state.mapType}
          style={styles.container}
          customMapStyle={mapDarkStyle}
          provider={PROVIDER_GOOGLE} //Needed to ensure google maps is used as the map
          showsUserLocation={grantedPerms}
          showsMyLocationButton={false}
          onRegionChangeComplete={(region) =>
            setState({ ...state, region: region })
          }
        >
          {state.selectedToiletDest.latitude && (
            <MapViewDirections
              origin={state.userLocation}
              destination={state.selectedToiletDest}
              apikey={MAP_API_KEY}
              strokeWidth={5}
              strokeColor="#00ced1"
              optimizeWaypoints={true}
              mode={state.mode}
              onReady={(result) => {
                toilet.distance = result.distance;
                toilet.duration = result.duration;
                console.log(toilet);
                _map.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20,
                  },
                });
              }}
              onError={(errorMessage) => {
                console.log(errorMessage);
                onAreaSearchPress();
              }}
            />
          )}
          <RenderMarkers />
        </MapView>
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
          <TouchableOpacity
            onPress={() => {
              onLocationButtonPress();
            }}
          >
            <View style={styles.locationButton}>
              <MaterialIcons
                name="my-location"
                size={26}
                color="black"
                style={{ top: 6, left: 6, opacity: 0.6 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onStyleButtonPress();
            }}
          >
            <View style={styles.circleButton}>
              <MaterialCommunityIcons
                name="theme-light-dark"
                size={24}
                color="black"
                style={{ top: 6, left: 6, opacity: 0.6 }}
              />
            </View>
          </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => {
              setState({ ...state, mode: "WALKING" });
            }}
          >
            <View style={styles.modeCircleButton}>
              <FontAwesome5
                name="walking"
                size={24}
                color="black"
                style={{ top: 6, left: 11, opacity: 0.6 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setState({ ...state, mode: "DRIVING" });
            }}
          >
            <View style={styles.modeCircleButton}>
              <MaterialIcons
                name="drive-eta"
                size={24}
                color="black"
                style={{ top: 6, left: 6.5, opacity: 0.6 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setState({ ...state, mode: "BICYCLING" });
            }}
          >
            <View style={styles.modeCircleButton}>
              <MaterialIcons
                name="directions-bike"
                size={24}
                color="black"
                style={{ top: 6, left: 6.5, opacity: 0.6 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* FOOTER */}
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
          <TouchableOpacity
            onPress={() => {
              //navigates to listscreen when pressed
              navigation.navigate("List", state.markers);
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
              //navigates to loginscreen or accountscreen when pressed
              onLoginPress();
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
          enabledContentTapInteraction={false} //this line needed to be added to make markers in bottomsheet respond to onpress
        />
      </View>
    );
  } else {
    return (
      <View style={styles.loadScreen}>
        <Image
          source={require("../../assets/loocate_icon.png")}
          style={styles.icon}
          resizeMode="cover"
        />
      </View>
    );
  }
};
