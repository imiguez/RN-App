import { FC, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getUsers } from "../apis/dummy-api/Users";

export const homePage: FC = () => {
  
    let [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(res => {
            setUsers(users = res.data);
        })
    }, []);

    return (
        <View >
            <FlatList
            data={users}
            renderItem={({item}) => {
                return <Text style={styles.item}>{item.title +" "+ item.firstName +" "+ item.lastName}</Text>
            }}/> 
        </View>
    );
}

  
const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      }
});