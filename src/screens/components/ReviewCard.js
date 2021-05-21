import React from 'react'
import {
    View, 
    Text,
    TouchableOpacity,
} from 'react-native'
import styles from '../model/ListStyles'
import StarRating from './StarRating'

export default ReviewCard = (props) => {
    return ( 
        <View style = {styles.textContent}>
            <View style = {{padding: 15}}>
            <Text><StarRating ratings={props.title}/>{props.title}</Text>
            <TouchableOpacity
                style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Edit Review</Text> 
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.appButtonContainerThree}>
                <Text style={styles.appButtonText}>Delete Review</Text> 
            </TouchableOpacity>
           </View>
            <View style={styles.hairline}/>
        </View>
    )
}