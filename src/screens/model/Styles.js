
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
    elevation: 10,
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
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    top: 160,
    paddingHorizontal: 10,
    alignSelf: "flex-end",
  },
  button: {
    padding: 20,
  },
  bottomContainer: {
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
    color: 'gray',
    height: 20,
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 2,
    width: 500
  },
  textSubheading: {
    paddingTop: 15,
    flexDirection: 'row',
    paddingLeft: 30,
    fontSize: 22
  },
  bottomPanel: {
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
    height: "100%",
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  
  card: {
    // padding: 10,
    elevation: 5,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
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
