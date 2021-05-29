import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#75CFB8'
  },
  title: {},
  logo: { //using
    flex: 1,
    height: 130,
    width: 110,
    alignSelf: "center",
    marginTop: 60,
    marginBottom: 60,
  },
  button: { //using for log out
    backgroundColor: "red",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTwo: { //using for view reviews
    backgroundColor: "#007965",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center", 
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  titleText: {
    marginTop: -55,
    fontSize: 25,
    textAlign:"center",
    color: "white",
  },
  footer: {
    // needs changing as the footer box is visible when navigating
    // to other screens
    position: "relative",
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: "#007965",
    padding: 20,
    marginBottom: 165,
    marginTop: 165,
  },
  footerButton: {
    paddingHorizontal: 50,
  },
});
