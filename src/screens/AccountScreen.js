import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './accountStyles.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config';

export default function AccountScreen({navigation}) {

    const onLogOutPress = () => {
        var user = firebase.auth().currentUser;
        console.log(user); //print user details to console, mainly for testing purposes      
        firebase.auth().signOut(); //sign out user
        navigation.navigate('Map'); 
    }

    return (
        
            <View style={styles.container}>
                <Text> Your Account</Text>
                <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%' }}
                    keyboardShouldPersistTaps="always">

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onLogOutPress()}>
                        <Text style={styles.buttonTitle}>Log out</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>

            </View>
    )}