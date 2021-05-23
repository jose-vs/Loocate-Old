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
            <Text numberOfLine={1} style = {styles.listTitle}>{props.title}</Text>         
            <Text numberOfLine={1} style = {styles.listAddress}>{props.address}</Text>     
            <Text><StarRating rating={props.loocateRating}/>{props.loocateRating} (Loocate)</Text>           
            <Text><StarRating rating={props.rating}/>{props.rating} (Google)</Text>                
           </View>
            <View style={styles.hairline}/>
        </View>
    )
}