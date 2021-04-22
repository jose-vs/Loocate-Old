import React, { useEffect, useState } from "react";
import { Text, View } from 'react-native';

const ToiletScreen = (props) => {

    return ( 
        <View style ={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text>Toilet Info </Text>
            <Text>Title: {props.navigation.getParam('title')}</Text>
            <Text>Address: {props.navigation.getParam('address')}</Text>
            <Text>Rating: {props.navigation.getParam('rating')}</Text>
            <Text>Reviews: {props.navigation.getParam('reviews')}</Text>
        </View>
    )
};

export default ToiletScreen;
