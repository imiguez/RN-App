import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { User } from "../../apis/dummy-api/Users";
import { NavigatorParams } from "../../MainNavigation";
import { UserListedButton } from "../../styles/Buttons";
import { InLineUserContainer } from "../../styles/Containers";
import { ProfilePhoto } from "../../styles/Images";
import { UserNamesList } from "../../styles/Texts";

interface UserListedButtonProps {
    user: User;
}


export const UserListedButtonComp: FC<UserListedButtonProps> = props => {
    
    const navigation = useNavigation<NativeStackNavigationProp<NavigatorParams>>();

    return (
        <InLineUserContainer>
            <UserListedButton onPress={() => navigation.navigate("Profile", { id: props.user.id })}>
                <ProfilePhoto source={{uri: props.user.picture}} style={{width: 45, height: 45}} />
                <UserNamesList>{props.user.title +" "+ props.user.firstName +" "+ props.user.lastName}</UserNamesList>
            </UserListedButton>
        </InLineUserContainer>
    );
}