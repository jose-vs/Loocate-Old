import React, { useEffect, useState } from "react";
import {
  Animated,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Animatable from "react-native-animatable";
import { FontAwesome, MaterialIcons, Entypo } from "@expo/vector-icons";
import { MAP_API_KEY } from "@env";
import toiletApi from "../../api/googlePlaces";
import { initialMapState } from "./model/MapData";
import { styles } from "./model/MapStyles";
import StarRating from "./components/StarRating";
import { CARD_WIDTH } from "./model/Constants";
import BottomSheet from "reanimated-bottom-sheet";
import * as Location from "expo-location";
import { firebase } from '../firebase/config';
import MapViewDirections from 'react-native-maps-directions'

//import Map_TopMenu from "./components/Map_TopMenu";

export default MapScreen = ({ navigation }) => {
  const [state, setState] = useState(initialMapState);
  const [areaLoad, setAreaLoad] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [grantedPerms, setPerms] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);
  const [destinationLat, setDestinationLat] = useState(null);
  const [destinationLong, setDestinationLong] = useState(null);
  const [tempLat, setTempLat] = useState(null);
  const [tempLong, setTempLong] = useState(null);

  //login screen transition...check if user is already logged in or not.
  const onLoginPress = () => { 
    //if there is a user logged in, retrieve them and skip having to go through login screen again
    
    firebase.auth().onAuthStateChanged(user => {
    if (user) { //if user is signed in
      const usersRef = firebase.firestore().collection('users'); //get user collection from firestore
      usersRef //call the database of user data (NOT the users in auth())
        .doc(user.uid)
        .get()
        .then((document) => {
          const data = document.data() //this is the specific data (not userAuth, but the data I made in the users collection) of the user
          console.log(data)
          navigation.navigate("Account", {user: data})
        }
        );
    } else {
      navigation.navigate("Login")
    }
  })
}
  
  //directions
  const origin = {latitude: userLat, longitude: userLong};
  const destination = {latitude: destinationLat, longitude: destinationLong};

  const onGetDirectionsPress = () => {
    setDestinationLat(tempLat);
    setDestinationLong(tempLong);
  }

  //direction
  useEffect(() => {
    (async () => {
      let { destination } = await renderInner();
      if (destinationLat === null) {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
      setUserLat(location.coords.latitude);
      setUserLong(location.coords.longitude);
      setPerms(true);
      setLocation(location);
    })();
  }, []);

  //user location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
      setUserLat(location.coords.latitude);
      setUserLong(location.coords.longitude);
      setPerms(true);
      setLocation(location);
    })();
  }, []);

  //fetch the api
  useEffect(() => {
    apiFetch();
  }, [areaLoad, location]);

  const apiFetch = async () => {
    var lat = areaLoad ? state.region.latitude : userLat;
    var lng = areaLoad ? state.region.longitude : userLong;
    await toiletApi
      .get(
        `&location=
            ${lat}, ${lng}
          &radius=
            ${state.radius}
          &keyword=toilet
          &key=${MAP_API_KEY}`
      )
      .then((response) => {
        // console.log(response.data)
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
          //need to get coords from inside newtoilet...which is put inside a marker. Go to onmarkerpress...
          console.log(newToilet);      
          state.markers.push(newToilet)  
        });
      })
      .catch((err) => console.log("Error:", err));
    setAreaLoad((current) => false);
  };

  const onAreaSearchPress = () => {
    setState({ ...state, markers: [] });
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
  const [title, setTitle] = useState();
  const [address, setAddress] = useState();
  const [ratings, setRatings] = useState();
  const [reviews, setReviews] = useState();

  const onMarkerPress = (mapEventData) => {
    // get the event data on press
    const markerID = mapEventData._targetInst.return.key;
    console.log(false); // get the markerID of the event data
    console.log(markerID);
    console.log(state.markers[markerID]);
    // console.log(state.markers[markerID].title);
    setMarker(markerID);
    setTitle(state.markers[markerID].title);
    setAddress(state.markers[markerID].address);
    setRatings(state.markers[markerID].rating);
    setReviews(state.markers[markerID].reviews);

    //DIRECTIONS SET TO COORDS OF MARKER WHEN MARKER PRESSED
    //sets destination
    //setDestinationLat(state.markers[markerID].coordinate.latitude);
    //setDestinationLong(state.markers[markerID].coordinate.longitude);
    //console.log(destination)     

    setTempLat(state.markers[markerID].coordinate.latitude);
    setTempLong(state.markers[markerID].coordinate.longitude);
    //setDestinationLat(tempLat);
    //setDestinationLong(tempLong);

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
      {marker && marker.length && (
        <Text
          style={
            styles.toiletTitle //check for null in useState otherwise crash on startup as undefined
          }
        >
          {title}
        </Text>
      )}
      {marker && marker.length && (
        <Text style={styles.toiletSubtitle}>{address}</Text>
      )}
      <View style={styles.hairline} />
      {marker && marker.length && (
        <TouchableOpacity
        onPress={() => onGetDirectionsPress()}>
          <Text style={styles.textSubheading}>Get Directions</Text>
        </TouchableOpacity>
      )}
      {marker && marker.length && (
        <Text style={styles.textSubheading}>
          Rating: <StarRating ratings={ratings} />
        </Text>
      )}
      {marker && marker.length && (
        <Text style={styles.textSubheading}>Reviews: {reviews}</Text>
      )}
    </View>
  );

  const _map = React.useRef(null);
  console.log(grantedPerms);

  if (location) {
    return (
      <View style={styles.container}>
        <MapView
          ref={_map}
          showuserLocation={true}
          loadingEnabled={true}
          loadingIndicatorColor="#75CFB8"
          loadingBackgroundColor="#fff"
          showsCompass={false}
          showsPointsOfInterest={false}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType={state.mapType}
          style={styles.container}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={grantedPerms}
          onRegionChangeComplete={(region) =>
            setState({ ...state, region: region })
          }
        >
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={MAP_API_KEY}
          strokeWidth={5}
          strokeColor="#00ced1"
          optimizeWaypoints={true}
          mode = "WALKING"  
          
          />
          {state.markers.map((marker, index) => {
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
          })}
        </MapView>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search here"
            placeholderTextColor="#777"
            autoCapitalize="none"
            style={styles.searchBoxText}
          />       
        {/* USER SCREEN */}
        <TouchableOpacity
          onPress={() => {
            //navigates to loginscreen or accountscreen when pressed
            onLoginPress();
          }}          
        >
          </TouchableOpacity>
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
