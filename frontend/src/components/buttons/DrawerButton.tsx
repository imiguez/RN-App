import { DrawerScreenProps } from "@react-navigation/drawer";
import React, { FC } from "react";
import { TouchableOpacity, Text } from "react-native";
import { NavigatorParams } from "../../navigators/MainNavigation";



export const DrawerButton: FC<DrawerScreenProps<NavigatorParams>> = (props) => {
    const {navigation} = props;

    return (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{width: 50, height: 30, backgroundColor: "#E0AFA0"}}>
            <Text>Menu</Text>
        </TouchableOpacity>
    );
}