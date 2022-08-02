import React, { FC, useState, useEffect } from "react";
import { FlatList } from "react-native";
import { User, getUsers } from "../../apis/dummy-api/Users";
import { InLineUserContainer } from "../../styles/Containers";
import { GoToUserChatButtonComp } from "../buttons/GoToUserChatButton";


export const FriendsListComp: FC = (props) => {
  
    let [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers().then(res => {
            setUsers(users = res.data);
        })
    }, []);

    return (
        <FlatList
            data={users}
            renderItem={ ({item}) => (
            <InLineUserContainer>
                <GoToUserChatButtonComp user={item} />
            </InLineUserContainer>)}
            keyExtractor={item => item.id} />
    );

    /*
        <LateralMenuContext.Consumer>{({position, HandleTheme}) => (
                <Animated.View style={[{ left: position}]}>
                    { props.children }
                    <ThemeButton onPress={HandleTheme}><Text>Theme</Text></ThemeButton>
                    <FlatList
                        data={users}
                        renderItem={ ({item}) => <UserListedButtonComp user={item}/>}
                        keyExtractor={item => item.id} />
                </Animated.View>
            )}
        </LateralMenuContext.Consumer>
    */
}