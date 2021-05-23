import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './model/LoginStyles';
import { firebase } from '../firebase/config';
import { StackActions } from '@react-navigation/native';

export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const popAction = StackActions.pop(1); //go back one screen in stack (number represents how many screens to go back by)

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate("Account", {user})
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%', backgroundColor: '#75CFB8' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../assets/loocate_icon.png')}
                    tintColor='white'
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text>
                    </Text>
                </View>
                <TouchableOpacity
                style={styles.buttonTwo}
                onPress={() => navigation.dispatch(popAction)}>
                <Text style={styles.buttonTitle}>Back</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}