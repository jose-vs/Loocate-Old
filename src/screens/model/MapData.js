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
  customMapStyle: null,
};

// const mapLightStyle = [
//   {
//     elementTyle: "labels.icons",
//     stylers: [
//       {
//         visability: "off",
//       },
//     ],
//   },
// ];

// const mapDarkStyle = [
//   {
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#242f3e",
//       },
//     ],
//   },
//   {
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#746855",
//       },
//     ],
//   },
//   {
//     elementType: "labels.text.stroke",
//     stylers: [
//       {
//         color: "#242f3e",
//       },
//     ],
//   },
//   {
//     featureType: "administrative.locality",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#d59563",
//       },
//     ],
//   },
//   {
//     featureType: "poi",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#d59563",
//       },
//     ],
//   },
//   {
//     featureType: "poi.park",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#263c3f",
//       },
//     ],
//   },
//   {
//     featureType: "poi.park",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#6b9a76",
//       },
//     ],
//   },
//   {
//     featureType: "road",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#38414e",
//       },
//     ],
//   },
//   {
//     featureType: "road",
//     elementType: "geometry.stroke",
//     stylers: [
//       {
//         color: "#212a37",
//       },
//     ],
//   },
//   {
//     featureType: "road",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#9ca5b3",
//       },
//     ],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#746855",
//       },
//     ],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "geometry.stroke",
//     stylers: [
//       {
//         color: "#1f2835",
//       },
//     ],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#f3d19c",
//       },
//     ],
//   },
//   {
//     featureType: "transit",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#2f3948",
//       },
//     ],
//   },
//   {
//     featureType: "transit.station",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#d59563",
//       },
//     ],
//   },
//   {
//     featureType: "water",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#17263c",
//       },
//     ],
//   },
//   {
//     featureType: "water",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#515c6d",
//       },
//     ],
//   },
//   {
//     featureType: "water",
//     elementType: "labels.text.stroke",
//     stylers: [
//       {
//         color: "#17263c",
//       },
//     ],
//   },
// ];

// const mapLightStyle = [
//   {
//     elementTyle: "labels.icons",
//     stylers: [
//       {
//         visability: "off",
//       },
//     ],
//   },
// ];

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
  duration: null,
  open: "",
};

export { initialMapState, filter, toilet };
