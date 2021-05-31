# Loocate

Loocate is a dedicated toilet finding application for android devices.

## Table of Contents

- [Installation] (#installation)

## Installation

Please use [Expo](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_NZ&gl=US) to run Loocate

In the terminal run

```bash
npm install
```

Then

```bash
expo start
```

This will then open your own unique web browser window of Metro Bundler.
It will also display a unique QR code to sca within the ExpoGo Application - On android scan this within the application.

## Technologies

- React-native v

"dependencies": {
"@expo/ngrok": "^2.4.3",
"@react-native-community/masked-view": "^0.1.10",
"@react-native-firebase/app": "^11.3.2",
"@react-navigation/native": "^5.9.4",
"@react-navigation/stack": "^5.14.4",
"axios": "^0.21.1",
"base-64": "^1.0.0",
"expo": "^41.0.1",
"expo-location": "^12.0.4",
"expo-permissions": "^12.0.1",
"expo-splash-screen": "~0.10.2",
"expo-status-bar": "~1.0.4",
"expo-updates": "~0.5.4",
"firebase": "^8.2.3",
"geolib": "^3.3.1",
"native-base": "^2.15.2",
"react": "16.13.1",
"react-dom": "16.13.1",
"react-native": "0.63.4",
"react-native-animatable": "^1.3.3",
"react-native-dotenv": "^2.5.5",
"react-native-firebase": "^5.6.0",
"react-native-geocoding": "^0.5.0",
"react-native-gesture-handler": "^1.10.3",
"react-native-google-places-autocomplete": "^2.2.0",
"react-native-keyboard-aware-scroll-view": "^0.9.3",
"react-native-maps": "0.27.1",
"react-native-maps-directions": "^1.8.0",
"react-native-paper": "^4.8.1",
"react-native-reanimatable": "^0.5.0",
"react-native-reanimated": "^2.1.0",
"react-native-redash": "^12.6.1",
"react-native-safe-area-context": "^3.2.0",
"react-native-screens": "^3.0.0",
"react-native-unimodules": "~0.13.3",
"react-native-web": "~0.13.12",
"react-navigation": "^4.4.4",
"react-navigation-stack": "^2.10.4",
"reanimated-bottom-sheet": "^1.0.0-alpha.22"

# Features

## creating a Loocate Account

To create a Looacte account you need to tap the bottom right icon once the application loads, this will take you to an acconut page where you are to sign in with an existing acount or 'Sign up' for a new account.

## Searching

The application will start off on your devices current location and display a view of markers on the map of registered public toilets.
To search for toilets outside of the current location you are able to use the search bar located at the top of the screen.

Searching a location will then require you to then press 'Search this area' which is located bottom right of the map. This will update the map with markers of toilets within a 2km radius.

You are also able to see all markers in a list view by clicking the bottom middle icon on the map. This will allow you to see all toilets and star ratings at once as well as get directions.

## Getting Directions

To get directions to a toilet you must select the 'Directions' button once you have selected a toilet, the directions button is located in the pop-up card that will appear once a toilet marker has been pressed.

## Direction Modes

Once a destination has been selected you are able to change the mode of transport to that destination.

This can been done by pressing either the 'car', 'walking' or 'cycling' icon located top right of the map. This will provided the fastest route based off that mode of transportation.

## Reviews

To leave reviews on a toilet you must be logged into a valid Loocate account.

If you are logged into a Looacte account you can leave a review on a toilet by scolling to the bottom of the pop-up card for a selected toilet and typing a review and then pressing 'Submit review'.

You are able to edit these reviews by pressing the pencil icon on your review (you can only do this on your own reviews).

## Dark Style Map

To change the style of the map between dark and light there is an icon located at the top of the map that represents a sun and moon, pressing this will swap between each style.

## Hybrid and street map

To change the style of the map between hybrid and street view there is an icon located at the top of the map that represents map layers, pressing this will swap between each style.

## Current Location

To snap to your device's current location on the map there is a button located at the top right of the map that represents a location icon, pressing this will snap the map view to the devices current location.
