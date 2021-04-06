import React, { useState, useEffect } from 'react'; 
import { Text, View, Dimensions, StyleSheet} from 'react-native'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as Location from 'expo-location';


const MapScreen = () => { 

    bs = React.createRef();
    fall = new Animated.Value(1);
    const buttonPressed = () => bs.current.snapTo(1);
    
    /*let state = { 
      hasLocationPermission: false,
      latitude: 0,
      longitude: 0,
      toiletList: []
    } */

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [gpsLatitude, setgpsLatitude] = useState(null);
    const [gpsLongitude, setgpsLongitude] = useState(null);
    const [toilets, setToilets] = useState([]);

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});

        setgpsLatitude(location.coords.latitude);
        setgpsLongitude(location.coords.longitude);
        setLocation(location);
      })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
    
    async function toiletSearch() {
    const url  = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    const gpsLocation = `&location=${gpsLatitude},${gpsLongitude}`;
    const radius = '&radius=5000';
    const type = '&keyword=toilet';
    const apikey = '&key=AIzaSyDqitoLWqXRaWLPBRs2KBhgxH3XMytlIGA';
    const toiletSearchUrl = url + gpsLocation + radius + type + apikey;
   
    fetch(toiletSearchUrl).then(response => response.json()).then(result => setToilets(result).catch( e => console.log(e))    )
   
    //console.log(gpsLocation)
   // console.log(toiletSearchUrl)
    useEffect(() => {
      toiletSearch();
    });
    } 

    function createMapMarkers() {
      
    }
  
    renderContentInfo = () => (
        <View style = { style.panel }>
            <View style={{alignItems: 'center'}}>
                <Text style={style.panelTitle}>JESUS</Text>
                <Text style={style.panelSubtitle}>this was annoying to code</Text>
            </View>
        </View>
      );
    
      renderHeaderInfo = () => (
        <View style={style.header}>
          <View style={style.panelHeader}>
            <View style={style.panelHandle} />
          </View>
        </View>
      );

    return (

        <View style={style.container}>

            <BottomSheet
                ref={bs}
                snapPoints={[500, 200,0]}
                renderContent={renderContentInfo}
                renderHeader={renderHeaderInfo}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
            
            <MapView 
                style={style.map} 
                initialRegion={{
                    // Auckland City
                    latitude: -36.853121304049786,
                    longitude: 174.76650674225814,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,

            }}/>  


            <View style={style.topContainer}>

                {/* Hamburger Menu */}
                <View style={style.hamburgerMenuStyle}>  
                    <TouchableOpacity onPress = {toiletSearch}>
                        <Entypo name="menu" size={34} color="black" style = {{opacity: 0.6}}/>
                    </TouchableOpacity>
                </View>

                <View style={style.buttonContainer}>

                    {/* Location Search Button */}
                    <TouchableOpacity onPress = {buttonPressed}>
                        <View style={style.circleButton}>
                            <FontAwesome name="search" size={24} color="black" style={{top: 6, left: 8, opacity: 0.6}}/>
                        </View>
                    </TouchableOpacity>

                    {/* Map Style Button */}
                    <TouchableOpacity onPress = {buttonPressed}>
                        <View style={style.circleButton}>
                            <MaterialIcons name="layers" size={26} color="black" style={{top: 6, left: 6, opacity: 0.6}}/>
                        </View>
                    </TouchableOpacity>

                </View>

            </View>

            
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    topContainer: { 
        marginTop: 55,
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    footerContainer: { 
        backgroundColor: 'red',
        position: 'absolute', 
        bottom: 0,
        alignItems: 'stretch'
    },
    buttonContainer: { 
        flexDirection: 'row', 
    },
    hamburgerMenuStyle: { 
        left: 10,
    },
    circleButton: { 
        marginRight: 10,
        marginLeft: 10,
        width: 38,
        height: 38,
        borderRadius: 100 / 2,
        backgroundColor: "#FFFFFA",
    },

    
      panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        paddingBottom: 200
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
      },
      header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
     
});

export default MapScreen; 