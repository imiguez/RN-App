import React, { ReactNode, FC, useState, useEffect } from "react";
import { Animated, FlatList, ViewProps, StyleSheet, Text } from "react-native";
import { LateralMenuContext } from "../../../App";
import { User, getUsers } from "../../apis/dummy-api/Users";
import { ThemeButton } from "../../styles/Buttons";
import { InLineUserContainer } from "../../styles/Containers";
import { ProfilePhoto } from "../../styles/Images";
import { UserNamesList } from "../../styles/Texts";


export const LateralMenuComp: FC = (props) => {
  
    let [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers().then(res => {
            setUsers(users = res.data);
        })
    }, []);

    
    const renderUsers = (user: User) => (
        <InLineUserContainer>
            <ProfilePhoto source={{uri: user.picture}} style={{width: 45, height: 45}} />
            <UserNamesList style={styles.item}>{user.title +" "+ user.firstName +" "+ user.lastName}</UserNamesList>
        </InLineUserContainer>
    )

    return (
        <LateralMenuContext.Consumer>{({position, HandleTheme}) => (
                <Animated.View style={[{ left: position}]}>
                    { props.children }
                    <ThemeButton onPress={HandleTheme}><Text>Theme</Text></ThemeButton>
                    <FlatList
                        data={users}
                        renderItem={ ({item}) => renderUsers(item)}
                        keyExtractor={item => item.id} />
                </Animated.View>
            )}
        </LateralMenuContext.Consumer>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      }
});