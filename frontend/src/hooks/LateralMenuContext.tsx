import React from "react";
import { Animated } from "react-native";
import { width } from "../styles/Utils";

export const LateralMenuContext = React.createContext({
    position: new Animated.Value(width),
    HandleTheme: () => {console.log("")}
});