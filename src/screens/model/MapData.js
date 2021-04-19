import React, { useEffect, useState } from "react";
import { MAP_API_KEY } from "@env";
import toiletApi from "../../../api/googlePlaces";

const Images = [
  { image: require("../../../assets/ToiletPhotos/toilet1.jpg") },
  { image: require("../../../assets/ToiletPhotos/toilet2.jpg") },
  { image: require("../../../assets/ToiletPhotos/toilet3.jpg") },
  { image: require("../../../assets/ToiletPhotos/toilet4.jpg") },
  { image: require("../../../assets/ToiletPhotos/toilet5.jpg") },
];


const markers = [];

const initialMapState = {
  markers,

  filter: [
    {
      type: "nearest",
    },
    {
      type: "top-rated",
    },
    {
      type: "visited",
    },
    {
      type: "not-visited",
    },
  ],

  region: {
    // Auckland City
    latitude: -36.853121304049786,
    longitude: 174.76650674225814,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },

  radius: 1000,

  showTopComponents: true,
  showPublicToilets: true,
};

export { initialMapState, markers };
