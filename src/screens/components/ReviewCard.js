import React, { useEffect, useState } from "react";
import {
    View, 
    Text,
    TouchableOpacity,
} from 'react-native'
import styles from '../model/ListStyles'
import StarRating from './StarRating'
import { firebase } from "../../firebase/config";
import { Entypo } from "@expo/vector-icons";

export default ReviewCard = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //check if review being rendered is made by the user or not. If so, set lz
    useEffect(() => {
        let userID;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {    
      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(user.uid)
        .get()
        .then((document) => {
          const data = document.data();
          userID = data.id;
          if (props.userID == userID)
          setIsLoggedIn(true);
        });
            }
        });   
    }, []);

    return ( 
        <View style = {styles.textContent}>
            <View style = {{padding: 15}}>  
            <Text numberOfLine={1} style = {styles.listTitle}>Jane Doe</Text>
            <Text><StarRating rating={props.rating}/>{props.rating}</Text>  
            <Text numberOfLine={1} style = {styles.listAddress}>{props.title}</Text>        
            {isLoggedIn ? <TouchableOpacity
                onPress={() => {props.navigation.navigate("ReviewViewAndCreate", props.item)}}>
                    <Entypo
                    style={{position: "relative", bottom: 0, left: 0}}
                    name="pencil"
                    size={30}
                    color="grey"               
                    /> 
            </TouchableOpacity> : null}              
           </View>
            <View style={styles.hairline}/>
        </View>
    )
}