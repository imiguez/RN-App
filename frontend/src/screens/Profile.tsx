import { useNavigation } from "@react-navigation/native";
import { FC, ReactNode, useEffect, useState } from "react";
import { Dimensions, StatusBar, View, Text } from "react-native";
import { getPostById, Post } from "../apis/dummy-api/Posts";
import { EmptyUser, getUser, User } from "../apis/dummy-api/Users";
import { ProfileCoverPhotoComp } from "../components/images/ProfileCoverPhotoComp";
import { ProfilePhotoComp } from "../components/images/ProfilePhotoComp";
import { ContainerProfile } from "../styles/Containers";
import { UserName } from "../styles/Texts";

interface ProfileProps {
    children?: ReactNode,
    route: {
        params: {
            id: string
        }
    }
}

export const Profile: FC<ProfileProps> = ({ route }) => {

    let [user, setUser] = useState<User>(EmptyUser);
    let [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getUser(route.params.id).then(res => {
            setUser(user = res);
        });
        getPostById(route.params.id).then(res => {
            setPosts(posts = res.data);
        });
        console.log(posts);
    }, []);

    return (
        <View>
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
            <View>
                {posts.length == 0 ?
                    <Text>Loading...</Text> 
                :
                    <Text>{posts[0].image }</Text>
                }
            </View>
        </View>
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