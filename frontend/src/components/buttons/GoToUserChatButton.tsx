import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { User } from "../../apis/dummy-api/Users";
import { NavigatorParams } from "../../navigators/MainNavigation";
import { GoToUserButton } from "../../styles/Buttons";
import { InLineUserContainer } from "../../styles/Containers";
import { ProfilePhoto } from "../../styles/Images";
import { UserNamesList } from "../../styles/Texts";

interface GoToUserChatButtonCompProps {
    user: User;
}


export const GoToUserChatButtonComp: FC<GoToUserChatButtonCompProps> = props => {
    
    const navigation = useNavigation<NativeStackNavigationProp<NavigatorParams>>();

    return (
        <GoToUserButton onPress={() => {
            // const name= `${props.user.firstName} ${props.user.lastName}`;
            // navigation.set ({headerTitle: name})
            navigation.navigate("Chat", {
                id: props.user.id, 
                name: `${props.user.firstName} ${props.user.lastName}`
            });
        }}>
            <ProfilePhoto source={{uri: props.user.picture}} style={{width: 45, height: 45}} />
            <UserNamesList>{props.user.title +" "+ props.user.firstName +" "+ props.user.lastName}</UserNamesList>
        </GoToUserButton>
    );
}
