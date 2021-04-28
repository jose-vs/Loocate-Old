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
    margin: 30,
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
  buttonTwo: { //using for view reviews
    backgroundColor: "#788eec",
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
    marginTop: -30,
    fontSize: 25,
    textAlign:"center",
    color: "white",
  },
});
