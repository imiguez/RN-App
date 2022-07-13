import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerNavigationProp, DrawerScreenProps } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ThemeButtonComp } from "../components/buttons/ThemeButtonComp";
import { NavigatorParams } from "./MainNavigation";




export const CustomDrawerNavigator: FC<DrawerContentComponentProps<DrawerContentOptions>> = (props) => {
    const navigation = props.navigation;
    const userId = "60d0fe4f5311236168a109ca";
    //const navigation = useNavigation<DrawerNavigationProp<NavigatorParams>>();
    // navigation.setOptions({
    //     headerTitleStyle: {fontWeight: 'bold'},
    //     headerRight: (() => 
    //     <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
    //         <Text>Menu</Text>
    //     </TouchableOpacity>
    // )});

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView>
                <ThemeButtonComp />
                <DrawerItem label={"Home"} onPress={() => {
                    navigation.toggleDrawer();
                    navigation.navigate("Home");
                }} />
                <DrawerItem label={"Profile"} onPress={() => {
                    navigation.toggleDrawer();
                    navigation.navigate<"Profile">("Profile", {id: userId, name: "Achei"});
                }} />
                <DrawerItem label={"Chats"} onPress={() => {
                    navigation.toggleDrawer();
                    navigation.navigate("Chats");
                }} />
            </DrawerContentScrollView>
        </View>
    )

}