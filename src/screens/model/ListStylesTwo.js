import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffa",
  },
  searchBox: {
    position: "absolute",
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 25,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 1,
  },
  placeNewReviewButton: {
    position: "absolute",
    marginTop: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "120%",
    alignSelf: "center",
    borderRadius: 25,
    padding: 10,
  },
  searchBoxText: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  textContent: {
    flex: 2,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    backgroundColor: "#FFF",
  },
  chipsScrollView: {
    position: "absolute",
    top: 110,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 1,
  },
  circleButton: {
    marginRight: 10,
    marginLeft: 10,
    width: 38,
    height: 38,
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "#FFF",
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 1,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listAddress: {
    fontSize: 15,
    fontStyle: "italic",
  },
  listButton: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  appButtonContainer: {
    width: 225,
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 15,
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    bottom: '0%',
    right: '-140%'
 
  },
  newReviewButtonList: {
    width: 215,
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginLeft: 95,
    marginRight: 70,
  },
  appButtonContainerTwo: {
    width: 120,
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 15,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    bottom: '-5%'
  },
  appButtonContainerThree: {
    width: 120,
    elevation: 8,
    backgroundColor: "red",
    borderRadius: 15,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    bottom: '-5%'
  },
  appButtonText: {
    fontSize: 17,
    color: "#fff",
    alignSelf: 'center',
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  listContainer: { 
    position: "relative",
    top: 160,
    marginBottom:160
  },
  hairline: {
    backgroundColor: "#A2A2A2",
    height: 2,
    alignSelf: 'center',
    width: 350,
  },
  footer: {
    // needs changing as the footer box is visible when navigating
    // to other screens
    position: "relative",
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: "#007965",
    padding: 20,
    justifyContent: "space-between",
  },
  footerButton: {
    paddingHorizontal: 50,
  },
});
