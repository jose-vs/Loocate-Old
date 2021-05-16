import { StyleSheet } from "react-native";

import { width, CARD_HEIGHT, CARD_WIDTH } from "./Constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: "absolute",
    marginTop: 50,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 25,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  searchBoxText: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  searchHere: {
    position: "absolute",
    bottom: 80,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
    marginLeft: 20,
    padding: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  searchHereText: {
    color: "#385c59",
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
    elevation: 10,
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    top: 110,
    paddingHorizontal: 10,
    alignSelf: "flex-end",
  },
  button: {
    padding: 20,
  },
  bottomContainer: {
    position: "absolute",
    flex: 1,
  },
  toiletTitle: {
    paddingLeft: 30,
    fontSize: 30,
    height: 35,
  },
  toiletSubtitle: {
    paddingLeft: 31,
    fontSize: 14,
    color: "gray",
    height: 20,
  },
  hairline: {
    backgroundColor: "#A2A2A2",
    height: 2,
    width: 500,
  },
  textSubheading: {
    paddingTop: 15,
    flexDirection: "row",
    paddingLeft: 30,
    fontSize: 22,
  },
  bottomPanel: {
    backgroundColor: "#FFFFFF",
    paddingTop: 5,
    height: "100%",
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  footer: {
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
  loadScreen: { 
    flex: 1,
    backgroundColor: '#75CFB8'
  },
  buttonTwo: { //using for directions screen
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center", 
  },
  icon: { 
    top: 200,
    position: 'relative',
    alignSelf: 'center',
    height: 292,
    width: 261
  }
});
