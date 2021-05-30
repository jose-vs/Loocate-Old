import React, { useEffect, useState } from "react";
import {
    View, 
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native'
import styles from '../model/ListStylesTwo'
import StarRating from './StarRating'
import { firebase } from "../../firebase/config";
import { Entypo } from "@expo/vector-icons";

export default AccountCard = (props) => {

    return ( 
        <View style = {styles.textContent}>
            <View style = {{padding: 15}}>  
            <Text numberOfLine={1} style = {styles.listTitle}>{props.name}</Text>
            <Text numberOfLine={1} style = {styles.listAddress}>{props.address}</Text>        
            <Text style = {styles.listAddress}><StarRating rating={props.rating}/>{props.rating}</Text>  
            <Text numberOfLine={1} style = {styles.listAddress}>{props.title}</Text>        
            <TouchableOpacity
                onPress={() => {Alert.alert("In development", "Functionality not added yet.")} /*Does nothing for now, plan is for it to navigate to a specific toilet and open the reviews on the bottomsheet...*/}> 
                    <Entypo
                    style={{position: "relative", bottom: 10, marginLeft: 280, marginRight: 0}}
                    name="eye"
                    size={30}
                    color="white"               
                    /> 
            </TouchableOpacity> 
            <View style={styles.hairline}/>          
           </View>
           
        </View>
    )
}    