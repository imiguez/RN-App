import React, { FC } from "react";
import { Button } from "react-native";
import { LateralMenuComp } from "../components/containers/LateralMenuComp";
import { ScreenProps } from "./ScreenUtils";

export const HomePage: FC<ScreenProps> = (props) => {


    return (
        <LateralMenuComp/>
    )
}