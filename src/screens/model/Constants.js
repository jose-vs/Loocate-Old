import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export { width, height, CARD_HEIGHT, CARD_WIDTH, SPACING_FOR_CARD_INSET };
