import React, { FC, useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigatorParams } from "../navigators/MainNavigation";
import { FriendsListComp } from "../components/lists/FriendsListComp";
import { TouchableOpacity, Text, FlatList, View } from "react-native";
import { EmptyPost, getPosts, Posts } from "../apis/dummy-api/Posts";
import { PostContainerComp } from "../components/containers/PostContainerComp";

type HomeProps = NativeStackNavigationProp<NavigatorParams, "Home">;

export const HomePage: FC = () => {
    
    let [state, setState] = useState<{posts: Posts, isLoading: boolean}>({posts: {data: [EmptyPost]}, isLoading: true});

    useEffect(() => {
        getPosts().then(res => {
            setState(state = {
                posts: res,
                isLoading: false
            });
        });
    }, [])
    console.log("carga home");

    return (
        <View>

            {(state.isLoading) ? 
                <Text>Loading...</Text>
            : (
                state.posts == undefined ? 
                <Text>Error</Text>
                :
                <FlatList
                data={state.posts.data}
                initialNumToRender={5}
                renderItem={({item}) => <PostContainerComp post={item}/>}
                keyExtractor={(item) => item.id} />
            )
            }
        </View>
    )
}