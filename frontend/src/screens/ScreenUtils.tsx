import { ReactNode } from "react";
import { Animated } from "react-native";

export interface ScreenProps {
    children?: ReactNode,
    position: Animated.Value
}