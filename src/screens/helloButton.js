import React from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';

const Button = ({onPress, title, isLoading, transparent}) => {
  return (
    <Pressable
      onPress={() => {
        if (!isLoading) {
          return onPress();
        }
      }}>
      <View style={transparent ? styles.transparentBtn : styles.btn}>
        <Text style={transparent ? styles.transparentTitle : styles.title}>
          {isLoading ? 'Loading...' : title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: '#74B3CE',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 4,
  },
  transparentBtn: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  transparentTitle: {
    color: '#74B3CE',
  },
});

export default Button;