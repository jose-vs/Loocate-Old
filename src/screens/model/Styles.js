
import {StyleSheet} from 'react-native';

import { 
    width, 
    CARD_HEIGHT, CARD_WIDTH
} from './Constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    elevation: 10,
  },
  searchBoxText: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  searchHere: { 
    position: "absolute",
    alignSelf: "center",
    top: 110,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
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
});
