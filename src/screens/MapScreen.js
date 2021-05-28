import React, { useEffect, useState, useRef } from "react";
import {
  Animated,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Animatable from "react-native-animatable";
import {
  FontAwesome,
  MaterialIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import { MAP_API_KEY } from "@env";
import { ScrollView } from "react-native-gesture-handler";
import toiletApi from "../../api/googlePlaces";
import distanceMatrixApi from "../../api/distanceMatrixApi";
import { initialMapState, toilet } from "./model/MapData";
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
  const [reviewsArray, setReviewsArray] = useState([]);
  const [toilet, setToilet] = useState(toilet);
  const [grantedPerms, setPerms] = useState(null);
  const mounted = useRef(false);

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

  //triggers on setToilet which only happens on marker press, retrieves toilet reviews
  useEffect(() => {
    if (mounted.current) {
      var addToReviewsArray = [];
      const reviewsRef = firebase.firestore().collection("reviews");

      reviewsRef.get().then((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          if (snapshot.data().toiletID == toilet.id) {
            addToReviewsArray = [...addToReviewsArray, snapshot.data()];
          }
        });
        setReviewsArray(addToReviewsArray);
      });
    } else {
      mounted.current = true;
    }
  }, [toilet]);

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
            open:
              toiletData.opening_hours === undefined
                ? ""
                : toiletData.opening_hours.open_now == true
                ? "open now"
                : "closed",
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
        setState({
          ...state,
          markers: result.sort((a, b) => (a.distance > b.distance ? 1 : -1)),
        });
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
      &key=${MAP_API_KEY}
      &mode=${state.mode.toLowerCase()}`
      )
      .then(async (response) => {
        return await Promise.resolve({
          id: toilet.id,
          coordinate: toilet.coordinate,
          title: toilet.title,
          address: toilet.address,
          rating: toilet.rating,
          reviews: toilet.reviews,
          distance:
            Math.round(
              (response.data.rows[0].elements[0].distance.value / 1000) * 100
            ) / 100,
          duration:
            Math.round(
              (response.data.rows[0].elements[0].duration.value / 60) * 100
            ) / 100,
          open: toilet.open,
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
        navigation.navigate("Account");
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

  //Submit review on selected toilet if logged in. If not logged in, alert and do nothing.
  const onSubmitReviewPress = () => {
    const usersRef = firebase.firestore().collection("users");
    const reviewsRef = firebase.firestore().collection("reviews");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const data = document.data();

            reviewsRef.add({
              title: review,
              name: data.fullName,
              address: toilet.address,
              toiletID: toilet.id,
              userID: data.id,
              rating: toilet.rating,
            });

            setReviewsArray([
              ...reviewsArray,
              {
                title: review,
                address: toilet.address,
                toiletID: toilet.id,
                userID: data.id,
                rating: toilet.rating,
              },
            ]);
          });

        Alert.alert("Submission success", "Your review has been placed.");
        this.textInput.clear();
      } else {
        Alert.alert(
          "Authentication required",
          "You must be logged in to place a review."
        );
        return;
      }
    });
  };

  /**
   * creates bottom sheet content
   */
  const bs = React.createRef();
  renderHeader = () => (
    <View style={styles.header}>
      {marker && marker.length && (
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.toiletTitle}>{toilet.title}</Text>
          <Text style={styles.toiletSubtitle}>{toilet.address}</Text>
        </View>
      )}
    </View>
  );

  renderInner = () => (
    <KeyboardAvoidingView style={styles.bottomPanel} behavior="height">
      <ScrollView
        vertical
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={true}
        style={styles.listContainer}
      >
        {marker && marker.length && (
          <View>
            {/* contains rating number icons and review number in row direction */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
                paddingHorizontal: 30,
              }}
            >
              <View
                style={{ flexDirection: "row", marginVertical: 8, left: 10 }}
              >
                <Text style={{ color: "#777", right: 6 }}>{toilet.rating}</Text>
                <StarRating ratings={toilet.rating} />
                <Text style={{ color: "#777" }}>({toilet.reviews})</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  onGetDirectionsPress();
                }}
              >
                <View style={styles.directionsButton}>
                  <FontAwesome5
                    name="directions"
                    size={24}
                    color="#fff"
                    style={{ top: 6, left: 6 }}
                  />
                  <Text style={{ left: 20, top: 7, color: "#fff" }}>
                    Directions
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                left: 5,
                justifyContent: "space-around",
                paddingHorizontal: 30,
              }}
            >
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                <Text
                  style={[
                    toilet.open == "closed"
                      ? { color: "#962d2d" }
                      : toilet.open == "open now"
                      ? { color: "#9fe6a0" }
                      : {},
                    { fontSize: 16 },
                  ]}
                >
                  {toilet.open}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingHorizontal: 28,
                paddingVertical: 5,
              }}
            >
              <RenderBsMode />
              <Text style={{ opacity: 0.6, right: 10 }}>
                {toilet.duration} min
              </Text>
              <Text style={{ opacity: 0.6 }}>({toilet.distance} km)</Text>
            </View>
          </View>
        )}
        {reviewsArray.map((item, index) => {
          return (
            <ReviewCard
              name={item.name}
              title={item.title}
              userID={item.userID}
              key={index}
              rating={item.rating}
              item={item}
              navigation={navigation}
            />
          );
        })}
        <TextInput
          onChangeText={() => {}}
          style={styles.reviewTextInputContainer}
          placeholder="Write your review here:"
          placeholderTextColor="#aaaaaa"
          multiline={true}
          numberOfLines={10}
          textAlign="left"
          onChangeText={(userInput) => (review = userInput)}
          ref={(input) => {
            this.textInput = input;
          }}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => onSubmitReviewPress()}
        >
          <Text style={styles.reviewButtonTitle}>Submit review</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const RenderBsMode = () => {
    switch (state.mode) {
      case "WALKING":
        return (
          <View>
            <FontAwesome5
              name="walking"
              size={18}
              color="black"
              style={{ marginHorizontal: 14, opacity: 0.6 }}
            />
          </View>
        );
      case "DRIVING":
        return (
          <View>
            <MaterialIcons
              name="drive-eta"
              size={18}
              color="black"
              style={{ marginHorizontal: 14, opacity: 0.6 }}
            />
          </View>
        );
      case "BICYCLING":
        return (
          <View>
            <MaterialIcons
              name="directions-bike"
              size={18}
              color="black"
              style={{ marginHorizontal: 14, opacity: 0.6 }}
            />
          </View>
        );
      default:
        return null;
    }
  };

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
                toilet.distance = Math.round(result.distance * 100) / 100;
                toilet.duration = Math.round(result.duration * 100) / 100;
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
        <TouchableOpacity
          style={styles.locationButtonContainer}
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
          <TouchableOpacity
            onPress={() => {
              setState({ ...state, mode: "WALKING" });
            }}
          >
            <View
              style={[
                styles.modeCircleButton,
                state.mode != "WALKING" ? {} : { backgroundColor: "#009688" },
              ]}
            >
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
            <View
              style={[
                styles.modeCircleButton,
                state.mode != "DRIVING" ? {} : { backgroundColor: "#009688" },
              ]}
            >
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
            <View
              style={[
                styles.modeCircleButton,
                state.mode != "BICYCLING" ? {} : { backgroundColor: "#009688" },
              ]}
            >
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
          snapPoints={["30%", "0%", "101.5%"]}
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
