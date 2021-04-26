import React from 'react'
import {
    View, 
    Text
} from 'react-native'
import styles from '../model/ListStyles'

export default ToiletCard = (props) => { 

    return ( 

        <View>
            <Text>{props.text}</Text>
        </View>
    )
}