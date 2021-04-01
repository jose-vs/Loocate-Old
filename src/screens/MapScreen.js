import React from 'react'; 
import { Text, View, Dimensions, StyleSheet} from 'react-native'; 
import { TouchableOpacity} from 'react-native-gesture-handler'
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import MapView from 'react-native-maps';

const MapScreen = () => { 

    const buttonPressed = () => console.log('Button Pressed');

    return (
        <View style={style.container}>
            
            <MapView 
                style={style.map} 
                initialRegion={{
                    // Auckland City
                    latitude: -36.853121304049786,
                    longitude: 174.76650674225814,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
            }}/>
            {this.mapMarkers()}

            <View style={style.topContainer}>

                {/* Hamburger Menu */}
                <View style={style.hamburgerMenuStyle}>  
                    <TouchableOpacity onPress = {buttonPressed}>
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
});

export default MapScreen; 