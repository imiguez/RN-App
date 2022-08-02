import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { User } from "../../apis/dummy-api/Users";
import { NavigatorParams } from "../../navigators/MainNavigation";
import { GoToUserButton } from "../../styles/Buttons";
import { ProfilePhoto } from "../../styles/Images";
import { UserNamesList } from "../../styles/Texts";

interface GoToUserProfileButtonCompProps {
    user: User;
}

export const GoToUserProfileButtonComp: FC<GoToUserProfileButtonCompProps> = (props) => {

    const navigation = useNavigation<NativeStackNavigationProp<NavigatorParams>>();
    const route = useRoute();

    return (
        <GoToUserButton onPress={() => {
            if (route.name != 'Profile')
                navigation.navigate("Profile", {id: props.user.id, name: `${props.user.firstName} ${props.user.lastName}`});
        }}>
            <ProfilePhoto source={{uri: props.user.picture}} style={{width: 45, height: 45}} />
            <UserNamesList>{props.user.title +" "+ props.user.firstName +" "+ props.user.lastName}</UserNamesList>
        </GoToUserButton>
    );
}