const initialMapState = {
  markers: [],

  region: {
    // Auckland City
    latitude: null,
    longitude: null,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  userLocation: {
    latitude: null,
    longitude: null,
  },
  selectedToiletDest: {
    latitude: null,
    longitude: null,
  },
  selectedToiletIndex: null,
  radius: 2000,
  mapType: "standard",
  mode: "WALKING",
};

const filter = [
  {
    type: "nearest",
  },
  {
    type: "top rated",
  },
  {
    type: "most reviewed",
  },
  {
    type: "open now",
  },

];

const toilet = {
  id: null,
  coordinate: {
    latitude: null,
    longitude: null,
  },
  title: "",
  address: "",
  rating: null,
  reviews: null,
  distance: null,
  duration: null
};

export { initialMapState, filter, toilet };
