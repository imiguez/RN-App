import { FC, useEffect, useState } from "react";
import { Dimensions, StatusBar, View } from "react-native";
import { EmptyUser, getUser, User } from "../apis/dummy-api/Users";
import { ProfileCoverPhotoComp } from "../components/images/ProfileCoverPhotoComp";
import { ProfilePhotoComp } from "../components/images/ProfilePhotoComp";
import { ContainerProfile } from "../styles/Containers";
import { UserName } from "../styles/Texts";



export const Profile: FC = () => {


    let [user, setUser] = useState<User>(EmptyUser);

    useEffect(() => {
        getUser("60d0fe4f5311236168a109ca").then(res => {
            setUser(user = res);
        })
    }, []);

    return (
        <ContainerProfile>
            <StatusBar/>

            <ProfileCoverPhotoComp 
            source={{uri: user.picture}}
            style={ImgDimensions.profileCoverPhoto}>

             </ProfileCoverPhotoComp>
            <ProfilePhotoComp
             source={{uri: user.picture}}
             style={ImgDimensions.profilePhoto}/>
             <UserName>{user.title} {user.firstName} {user.lastName}</UserName>

        </ContainerProfile>
            
    );
}


const ImgDimensions = {
    "profilePhoto": {
        "width": 100, 
        "height": 100
    },
    "profileCoverPhoto": {
        "width": Dimensions.get('window').width, 
        "height": Dimensions.get('window').height / 4
    },
}