import React, { FC, useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigatorParams } from "../navigators/MainNavigation";
import { FriendsListComp } from "../components/lists/FriendsListComp";
import { TouchableOpacity, Text, FlatList, View } from "react-native";
import { getPosts, Posts } from "../apis/dummy-api/Posts";
import { PostContainerComp } from "../components/containers/PostContainerComp";

type HomeProps = NativeStackNavigationProp<NavigatorParams, "Home">;

export const HomePage: FC = () => {
    
    let [posts, setPosts] = useState<Posts>();

    useEffect(() => {
        getPosts().then(res => {
            setPosts(posts = res);
        });
    }, [])
    console.log("carga home");

    return (
        // <FriendsListComp />
        <View>

            {(posts == undefined ) ? 
                <Text>Conexion Error</Text>
            :
                <FlatList
                data={posts.data}
                initialNumToRender={5}
                renderItem={({item}) => <PostContainerComp post={item}/>}
                keyExtractor={(item) => item.id} />
            }
        </View>
    )
}