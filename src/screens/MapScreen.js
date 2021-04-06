import React, { useEffect } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";

import * as Animatable from 'react-native-animatable';

import { 
  FontAwesome, 
  Ionicons, 
  FontAwesome5, 
  MaterialIcons 
} from '@expo/vector-icons';

import { markers } from './model/MapData';
import StarRating from './components/StarRating';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


const MapScreen = () => { 

  const initialMapState = {
    markers,

    filter: [
      { 
        type: 'nearest', 
      },
      {
        type: 'top-rated',
      },
      {
        type: 'visited',
      },
      {
        type: 'not-visited',
      },
    ],
    
    region: {
      // Auckland City
      latitude: -36.853121304049786,
      longitude: 174.76650674225814,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },

    showTopComponents: true, 
    showPublicToilets: true,

  };
  
  
  const [state, setState] = React.useState(initialMapState);
  
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  let scrollViewHeight = new Animated.Value(0)

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ) {
          mapIndex = index;
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

    var toValue = state.showPublicToilets ? 
    0 : (CARD_HEIGHT + 10);

    Animated.timing(
      scrollViewHeight, {
      toValue:  toValue, 
      duration: 500,
      useNativeDriver: true,
    }).start();

    

  }, [state.showPublicToilets]);

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;


    let x = (markerID * CARD_WIDTH) + (markerID * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }


  

  const hideComponents = () => {
    if(state.showPublicToilets) {
      setState({...state, showPublicToilets: false});
    } else if (!state.showPublicToilets) {
      setState({...state, showPublicToilets: true});
    }
  }

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        onPress={()=>{ hideComponents() }}
      >
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: state.showPublicToilets ? interpolations[index].scale : 1,
              },
            ],
          };
          return (
            <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e)=>onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../../assets/pin.png')}
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
        <FontAwesome name="search" size={24} color="black" style={{right: 8, opacity: 0.6}}/>
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{ // iOS only
          top:0,
          left:0,
          bottom:0,
          right:20
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0
        }}
      >
        <TouchableOpacity style = {styles.circleButton}>

          <Ionicons name="filter" size={26} color="black" style ={{top: 7, left: 7, opacity: 0.6}}/> 
        </TouchableOpacity>

        {state.filter.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem}>
            <Text>{category.type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>

        {/* Map Style Button */}
        <TouchableOpacity onPress={()=>{}}>
            <View style={styles.circleButton}>
                <MaterialIcons name="layers" size={26} color="black" style={{top: 6, left: 6, opacity: 0.6}}/>
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
          style={[styles.scrollView,{translateY: scrollViewHeight}]}
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET
          }}
          contentContainerStyle={{
            paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  }
                },
              },
            ],
            {useNativeDriver: true}
          )}
        >
          {state.markers.map((marker, index) =>(
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
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <StarRating ratings={marker.rating} reviews={marker.reviews} />
                <Text numberOfLines={1} style={styles.cardDescription}>{marker.address}</Text>
              </View>
            </Animatable.View>
          ))}
        </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position:'absolute', 
    marginTop: 50, 
    flexDirection:"row",
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 25,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  searchBoxText: { 
    paddingLeft: 8,
    paddingRight: 8,
  },
  chipsScrollView: {
    position:'absolute', 
    top: 110, 
    paddingHorizontal:10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  circleButton: { 
    marginRight: 10,
    marginLeft: 10,
    width: 38,
    height: 38,
    borderRadius:20,
    flexDirection:"row",
    backgroundColor: "#FFF",
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  }, 
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  buttonContainer: { 
    position:'absolute', 
    flexDirection: 'row', 
    top: 160, 
    paddingHorizontal:10,
    alignSelf: 'flex-end',
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 5,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 30,
    height: 30,
  },
});
export default MapScreen; 