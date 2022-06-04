import React, { FC, useState, useEffect } from "react";
import { Animated, FlatList, Text } from "react-native";
//import { LateralMenuContext } from "../../../App";
import { User, getUsers } from "../../apis/dummy-api/Users";
import { LateralMenuContext } from "../../hooks/LateralMenuContext";
import { ThemeButton } from "../../styles/Buttons";
import { UserListedButtonComp } from "../buttons/UserListedContainer";


export const LateralMenuComp: FC = (props) => {
  
    let [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers().then(res => {
            setUsers(users = res.data);
        })
    }, []);

    return (
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
    );
}