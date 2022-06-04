import React, { FC } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LateralMenuComp } from "../components/containers/LateralMenuComp";
import { NavigatorParams } from "../MainNavigation";

type HomeProps = NativeStackNavigationProp<NavigatorParams, "Home">;

export const HomePage: FC<HomeProps> = (props) => {

    return (
        <LateralMenuComp/>
    )
}