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
  ActivityIndicator,
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
import { ScrollView } from "react-native-gesture-handler";
import toiletApi from "../../api/googlePlaces";
import distanceMatrixApi from "../../api/distanceMatrixApi";
import { initialMapState, toilet } from "./model/MapData";
import { styles } from "./model/MapStyles";
//import StarRating from "./components/StarRating";
import StarRating from 'react-native-star-rating';
import { CARD_WIDTH } from "./model/Constants";
import BottomSheet from "reanimated-bottom-sheet";
import * as Location from "expo-location";
import { firebase } from "../firebase/config";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoding";
import ReviewCard from "./components/ReviewCard";

const mapDarkStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#263c3f",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6b9a76",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#38414e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#212a37",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9ca5b3",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#1f2835",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f3d19c",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#2f3948",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#515c6d",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
];

/* mapLightStyle is needed to be empty*/
const mapLightStyle = [];

export default MapScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [state, setState] = useState(initialMapState);
  const [toilet, setToilet] = useState(toilet);
  const [grantedPerms, setPerms] = useState(null);
  const [isLoading, setIsLoading] = useState(false); //controls whether reviews are being rendered or not
  const mounted = useRef(false); //used to determine if marker is mounted or not

  //Refactor this code later, should probably be added into one big useState or maybe added to the one above...will see
  const [reviewsArray, setReviewsArray] = useState([]); 
  const [editReview, setEditReview] = useState(null); //used for conditional rendering of edit textInput vs place review textInput
  const [reviewToEdit, setReviewToEdit] = useState(null); //used in edit review process
  const [editReviewText, setEditReviewText] = useState(null);
  const [starRating, setStarRating] = useState(-1);
  const [trigger, setTrigger] = useState(0); //shouldn't use this probably, but an independent use state used to trigger useEffects when I want
  const [userr, setUserr] = useState(false);
  
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

  
  //clean up useEffect, unmounting on auth changed listener...
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => { // detaching the listener 
      if (user) {
        setUserr(user);
      } else {       
        setUserr(null);      
      }
  });
  console.log("Cancel auth subscription..")
  return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting
}, [userr]);

  /* Triggers on toilet changes, which only happens on marker press, retrieves toilet reviews, 
     overwrites existing google reviews/ratings to be loocate reviews and ratings
  */
  useEffect(() => {
    setEditReview(false); //done so that if a review in the process of being edited, this is switched back to submitReview
    setIsLoading(true); //activity indicator set to load at all times, unless the toilet marker is mounted in the if below

    if (mounted.current) {
      var addToReviewsArray = [];
      var loocateOverallRating = 0;
      var numberOfReviews = 0;
      var updatedToilet = toilet;

      const reviewsRef = firebase.firestore().collection("reviews");
      reviewsRef.get().then((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          if (snapshot.data().toiletID == toilet.id) {
            addToReviewsArray = [...addToReviewsArray, snapshot.data()];
            loocateOverallRating = snapshot.data().rating + loocateOverallRating; //will get overall rating of all reviews for toilet
            numberOfReviews = numberOfReviews + 1; //will give us a counter for number of reviews for toilet
          }
        } 
      )
        updatedToilet.rating = Number(Math.round(parseFloat((loocateOverallRating / numberOfReviews) + 'e' + 2)) + 'e-' + 2)
        updatedToilet.reviews = numberOfReviews;
          setReviewsArray(addToReviewsArray);

        if (isNaN(updatedToilet.rating)) {
          updatedToilet.rating = 0;
          setToilet(updatedToilet); 
        }
        else if (!isNaN(updatedToilet.rating)) {
          setToilet(updatedToilet);  
        }             
        setIsLoading(false);                  
      });
    }
    else if (!mounted.current) {      
      mounted.current = true;   
      setIsLoading(true)  
    }
  }, [toilet, trigger]);

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
                ? "Opening hours not available"
                : toiletData.opening_hours.open_now == true
                ? "Open now"
                : "Closed",
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
      if (userr)
        navigation.navigate("Account");
      else if (!userr)
        navigation.navigate("Login");
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
    
    if (starRating == -1 ) {
      Alert.alert(
        'Rating required',
        'Please rate your review before submitting it.');
        setStarRating(-1);
        return;   
      }
      else if (review == "") {
        Alert.alert(
          'Input required',
          'Please input text to submit a review.'); 
          return;   
      }
      else if (starRating != -1) {
        const usersRef = firebase.firestore().collection("users"); 
        const reviewsRef = firebase.firestore().collection('reviews');

        if (userr) {       
          usersRef
          .doc(userr.uid)
          .get()
          .then((document) => {
          const data = document.data();
            
          //get reviews db, create blank doc, get its id, add the following fields to that new doc via set
          const reviewsRef = firebase.firestore().collection('reviews')
          const id = firebase.firestore().collection('reviews').doc().id
          firebase.firestore().collection('reviews').doc(id).set({
            title: review,
            name: data.fullName,
            address: toilet.address,
            toiletID: toilet.id,
            userID: data.id,
            rating: starRating,
            reviewID: id,
          })
                
          setReviewsArray([...reviewsArray , {title: review, name: data.fullName, address: toilet.address, toiletID: toilet.id, 
            userID: data.id, reviewID: id, rating: toilet.rating, reviews: toilet.reviews}]); 
          setStarRating(-1);
          setTrigger(trigger + 1);
        })
    
        Alert.alert(
          'Submission success',
          'Your review has been placed.'); 
          this.textInput.clear()
          return;
        } 
        else {
          Alert.alert(
            'Authentication required',
            'You must be logged in to place a review.');  
          return;      
        }

      }
  }

  //Update edited review text in database, then change text input back to submit review.
  const onEditReviewPress = () => { 
      
    if (starRating == -1 ) { //probably wont ever run
      Alert.alert(
        'Rating required',
        'Please rate your review before submitting your edit.');
        setStarRating(-1);
        return;   
      }
      else if (editReviewText == "") {
        Alert.alert(
          'Input required',
          'Please input text to submit your edit.'); 
          return;   
      }
    else if (starRating != -1) {
      //first, update local review with the correct field
      reviewToEdit.title = editReviewText;
      reviewToEdit.rating = starRating;

      //then iterate through the reviews collection till we find the matching review, and update title field with editReviewText
      const reviewsRef = firebase.firestore().collection('reviews');
      reviewsRef.get().then((querySnapshot) => {
        querySnapshot.forEach(snapshot => {
            if (snapshot.data().reviewID == reviewToEdit.reviewID){
              reviewsRef.doc(snapshot.data().reviewID).update({
                "title": reviewToEdit.title,
                "rating": reviewToEdit.rating,
              })

              //add updated review to local array..
              setReviewsArray([...reviewsArray]);          
            }
            setStarRating(-1);
            setTrigger(trigger + 1); 
        }
      )});

      Alert.alert(
        'Edit success',
        'Your review has been updated.'); 
        this.textInput.clear();
        setEditReview(false);
        return;  
    }
  }

  const onStarRatingPress = (starcount) => { 
    setStarRating(starcount);
    return;
  }
  
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
      {isLoading ? <ActivityIndicator style={styles.loading} 
      size="large" color="#007965"/> :       <ScrollView
      vertical
      scrollEventThrottle={1}
      showsVerticalScrollIndicator={true}
      style={styles.listContainer}
      contentContainerStyle={{
        paddingBottom: 80
      }}
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
              <StarRating 
                starSize={15} fullStar={'ios-star'} emptyStar={'ios-star-outline'} halfStar={'ios-star-half'} iconSet={'Ionicons'} disabled={false} 
                fullStarColor={'#FFD704'} emptyStarColor={'#FFD704'} halfStarColor={'#FFD704'} maxStars={5} 
                rating={toilet.rating}
              />
              <Text style={{ color: "#777" }}>({toilet.reviews}) reviews</Text>
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
                  style={{ top: 6, left: 5 }}
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
                  toilet.open == "Closed"
                    ? { color: "#962d2d" }
                    : toilet.open == "Open now"
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
            <Text style={{ opacity: 0.6, textAlign: 'center' }}>({toilet.distance} km)</Text>
          </View>
        </View>
      )}
      {!reviewsArray.length ? <Text style={styles.noReviewsText}>No reviews yet. Be 
      the first to place one!</Text> : <View>
      {reviewsArray.map((item, index) => {
        editedReview = item;
        return (
          <ReviewCard
            key={index}
            name={item.name}                   
            title={item.title}  
            userID={item.userID}         
            rating={item.rating}  
            item={item}  
            navigation={navigation} 
            setEditReview={setEditReview}
            setReviewToEdit={setReviewToEdit}  
            setEditReviewText={setEditReviewText}
          />
        );
      })}
      </View>}
    </ScrollView>}
    {isLoading ? <ActivityIndicator style={styles.loading} 
      size="large" color="#007965"/> : <View
      style={styles.reviewButtonContainer}>   
      {editReview ? <TextInput       
          style={styles.reviewTextInputContainer}
          multiline={true}        
          numberOfLines={10}
          textAlign='left'
          onChangeText={setEditReviewText}
          value = {editReviewText}  
          ref={input => { this.textInput = input }} 
          underlineColorAndroid="transparent"/> : <TextInput onChangeText={() => {}}       
          style={styles.reviewTextInputContainer}
          placeholder='Write your review here:'
          placeholderTextColor="#aaaaaa"
          multiline={true}          
          numberOfLines={10}
          textAlign='left'
          onChangeText={(userInput) => review = (userInput)}
          ref={input => { this.textInput = input }} 
          underlineColorAndroid="transparent"
        />}
        <TouchableOpacity
          style={styles.starRatingButton}
          onPress={() => onStarRatingPress()}>
          <Text>
            <StarRating 
            starSize={20} fullStar={'ios-star'} emptyStar={'ios-star-outline'} halfStar={'ios-star-half'} iconSet={'Ionicons'} disabled={false} 
            fullStarColor={'#FFD704'} emptyStarColor={'#FFD704'} halfStarColor={'#FFD704'} maxStars={5} 
            selectedStar={(rating) => onStarRatingPress(rating)} rating={starRating}
            />
          </Text>  
        </TouchableOpacity>  
        {editReview ? <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => onEditReviewPress()}> 
          <Text style={styles.reviewButtonTitle}>Edit Review</Text>    
        </TouchableOpacity> : <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => onSubmitReviewPress()}> 
          <Text style={styles.reviewButtonTitle}>Submit review</Text>    
        </TouchableOpacity>}
      </View>}
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
          customMapStyle={state.customMapStyle}
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
          {/* Dark Mode Button */}
          <TouchableOpacity
            onPress={() => {
              if (state.customMapStyle == null) {
                setState({ ...state, customMapStyle: mapDarkStyle });
              } else if (state.customMapStyle == mapDarkStyle) {
                setState({ ...state, customMapStyle: mapLightStyle });
              } else if (state.customMapStyle == mapLightStyle) {
                setState({ ...state, customMapStyle: mapDarkStyle });
              }
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
          snapPoints={["30%", "0%", "100%"]}
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
