import React from 'react'
import {
    View, 
    Text,
    TouchableOpacity,
} from 'react-native'
import styles from '../model/ListStyles'
import StarRating from './StarRating'

export default ToiletCard = (props) => {
    return ( 
        <View style = {styles.textContent}>
            <View style = {{padding: 15}}>
            <Text numberOfLine={1} style = {styles.listTitle}>{props.title}</Text>
            <Text numberOfLine={1} style = {styles.listAddress}>{props.address}</Text>
            <Text><StarRating ratings={props.ratings}/>{props.ratings}</Text>
            <TouchableOpacity style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Directions</Text>
            </TouchableOpacity>
           </View>
            <View style={styles.hairline}/>
        </View>
    )
}