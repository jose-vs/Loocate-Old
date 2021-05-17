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
  radius: 2000,
  mapType: "standard",
  mode: "WALKING",
  onSearch: false
};

const filter = [
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
};

export { initialMapState, filter, toilet };
