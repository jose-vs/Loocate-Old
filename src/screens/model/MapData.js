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
<<<<<<< HEAD

  //reviews
  reviewsArrayx:  [], //stores all reviews 
  editReview: false, //variable used to conditionally render bottomsheets text input between edit and submit review
  reviewToEdit:  "", //single review object being sent to have its text updated in editreviewpress
=======
  customMapStyle: null,
>>>>>>> Darkstyle
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
  loocateRating: null,
  loocateReviews: null,
  reviews: null,
  distance: null,
  duration: null,
  open: "",
};

export { initialMapState, filter, toilet };
