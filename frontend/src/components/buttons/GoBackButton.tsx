import { DrawerScreenProps } from "@react-navigation/drawer";
import { CommonActions } from "@react-navigation/native";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NavigatorParams } from "../../navigators/MainNavigation";


export const GoBackButton: FC<DrawerScreenProps<NavigatorParams>> = (props) => {

    const {route, navigation} = props;

    return (
        <View>
        {navigation.canGoBack() && !navigation.getState().history.some((it) => it.type === 'drawer') &&
            <TouchableOpacity onPress={() => navigation.dispatch(CommonActions.goBack())}>
            <Text>Back</Text>
            </TouchableOpacity>
        }
        </View>
    )
}