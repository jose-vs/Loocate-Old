

const initialMapState = {
  markers: [],

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

  radius: 2000,

  showTopComponents: true,
  mapType: "standard"
};

export { initialMapState };
