import { DrawerScreenProps } from "@react-navigation/drawer";
import { FC, useEffect, useRef, useState } from "react";
import { Dimensions, StatusBar, View, Text, ScrollView, FlatList } from "react-native";
import { getPostById, Post } from "../apis/dummy-api/Posts";
import { EmptyUser, getUser, User } from "../apis/dummy-api/Users";
import { PostContainerComp } from "../components/containers/PostContainerComp";
import { ProfileCoverPhotoComp } from "../components/images/ProfileCoverPhotoComp";
import { ProfilePhotoComp } from "../components/images/ProfilePhotoComp";
import { NavigatorParams } from "../navigators/MainNavigation";
import { ContainerProfile } from "../styles/Containers";
import { UserName } from "../styles/Texts";


type ProfileProps = DrawerScreenProps<NavigatorParams, "Profile">;


export const Profile: FC<ProfileProps> = ({ route, navigation }) => {

    let [state, setState] = useState<{posts: Post[], user: User}>({posts: [], user: EmptyUser});
    useEffect(() => {
        getPostById(route.params.id).then(res => {
            setState(state = {
                posts: res.data,
                user: (res.data.length > 0 ? res.data[0].owner : getUser(route.params.id).then(res => {return res})),
            });
        });
    }, [route]);
    console.log(route+ " Profile ");

    return (
        <View>
            <ContainerProfile>
                <ProfileCoverPhotoComp 
                source={{uri: state.user.picture}}
                style={ImgDimensions.profileCoverPhoto} >

                </ProfileCoverPhotoComp>
                <ProfilePhotoComp
                source={{uri: state.user.picture}}
                style={ImgDimensions.profilePhoto} />
                <UserName>{state.user.title} {state.user.firstName} {state.user.lastName}</UserName>

            </ContainerProfile>
            {!state.posts ?
             <Text>Loading...</Text> 
            :
             <FlatList 
              data={state.posts}
              initialNumToRender={5}
              renderItem={({item}) => <PostContainerComp post={item}/>}
              keyExtractor={(item) => item.id}/>
            }
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