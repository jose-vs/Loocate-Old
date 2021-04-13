import React, {Component} from 'react'; 
import { 
    View, 
    Text, 
    StyleSheet, 
    ImageBackground
} from "react-native"; 

const AnimationTestScreen = () => { 

    return ( 
        <View style = {{flex: 1}}> 
            <ImageBackground source={require('../../assets/pancake.jpg')}
            style = {{flex: 1}}/>

            <View style = {{flex: 1, justfiyContent: 
                'center', alingItems: 'center'}}>
                <View style = {{ backgroundColor: 'white', 
                height: 100, width: 100, alignItems:
                'center', justifyContent: 'center'}}>
                    <Text style = {{fontWeight: 'bold',
                     fontSize: 26}}>Uber</Text>
                </View>
            </View>

            <View> 
                <View style ={{height: 70, backgroundColor: 'white', 
                alignItems: 'center', justifyContent: 'center', 
                borderTopColor: 'grey'}}>
                    <Text style = {{color: 'yellow', fontWeight: 'bold'}}></Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({ 

});

export default AnimationTestScreen; 