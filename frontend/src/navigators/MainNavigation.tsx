import { createDrawerNavigator } from "@react-navigation/drawer";
import { getFocusedRouteNameFromRoute, NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { TouchableOpacity, Text } from "react-native";
import { AppState } from "../../App";
import { DrawerButton } from "../components/buttons/DrawerButton";
import { GoBackButton } from "../components/buttons/GoBackButton";
import { FriendsListComp } from "../components/lists/FriendsListComp";
import { Chat } from "../screens/Chat";
import { Chats } from "../screens/Chats";
import { HomePage } from "../screens/HomePage";
import { Profile } from "../screens/Profile";
import { CustomDrawerNavigator } from "./CustomDrawerNavigator";

export type NavigatorParams = {
    Home: undefined;
    Profile: {
        id: string,
        name: string,
    };
    Chats: undefined;
    Chat: {
      id: string,
      name: string,
    };
    Settings: undefined;
};
type NavigationProps = {
  state: AppState;
}

export const MainNavigation: FC<NavigationProps> = ({state}) => {
  
  const Drawer = createDrawerNavigator<NavigatorParams>();

  return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" drawerPosition="right"
          drawerContentOptions={{
            activeTintColor: '#e91e63',
          }}
          drawerContent={(props) => (<CustomDrawerNavigator {...props}/>)}
          screenOptions={(props) => ({
          headerTintColor: state.theme.colors.text,
          headerStyle: {backgroundColor: state.theme.colors.primary},
          headerTitleStyle: {fontWeight: 'bold'},
          headerShown: true,
          headerTitleAlign: 'center',
          headerRight: (() => <DrawerButton {...props}/>),
          headerLeft: (() => <GoBackButton {...props} />),
        })}>
          
          <Drawer.Screen name='Home' component={HomePage}/>
          <Drawer.Screen name='Profile' options={{title: 'Profile'}} component={Profile}/>
          <Drawer.Screen name='Chats' component={Chats} />
          <Drawer.Screen name='Chat' component={Chat} options={({ route }) => ({
            headerTitle: route.name,
          })}/>
        </Drawer.Navigator>
      </NavigationContainer>
  )
}