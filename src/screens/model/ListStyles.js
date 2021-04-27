import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffa",
  },
  searchBox: {
    position: "absolute",
    marginTop: 50,
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
  searchBoxText: {
    paddingLeft: 8,
    paddingRight: 8,
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
