const Images = [
    { image: require("../../../assets/ToiletPhotos/toilet1.jpg") },
    { image: require("../../../assets/ToiletPhotos/toilet2.jpg") },
    { image: require("../../../assets/ToiletPhotos/toilet3.jpg") },
    { image: require("../../../assets/ToiletPhotos/toilet4.jpg") },
    { image: require("../../../assets/ToiletPhotos/toilet5.jpg") }
];

export const markers = [
    {
      coordinate: {
        latitude: -36.842652315421944,
        longitude: 174.75737909974987,
      },
      title: "Public Toilet",
      address: "Auckland CBD, Auckland 1010",
      image: Images[0].image,
      rating: 4,
      reviews: 99,
    },
    {
      coordinate: {
        latitude: -36.84505639373587,
        longitude: 174.7599258572095,
      },
      title: "Public Toilet",
      address: "Albert Park, Auckland CBD, Auckland 1010",
      image: Images[1].image,
      rating: 5,
      reviews: 102,
    },
    {
      coordinate: {
        latitude: -36.846704860895336,
        longitude: 174.7572946101659,
      },
      title: "Public Toilets Myers Park",
      address: "Unnamed Road, Auckland CBD, Auckland 1010",
      image: Images[2].image,
      rating: 3,
      reviews: 220,
    },
    {
      coordinate: {
        latitude: -36.846086689875385,
        longitude: 174.76121465864117,
      },
      title: "Public Toilets Queens Wharf",
      address: "Queens Wharf, Auckland",
      image: Images[3].image,
      rating: 4,
      reviews: 48,
    },
    {
      coordinate: {
        latitude: -36.850070370990736,
        longitude: 174.76393307747776,
      },
      title: "Public Toilets Wynyard Quarter",
      address: "Wynyard Quarter, Auckland 1010",
      image: Images[4].image,
      rating: 4,
      reviews: 178,
    },
];