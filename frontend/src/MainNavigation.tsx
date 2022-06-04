import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Button } from "react-native";
import { AppState } from "../App";
import { HomePage } from "./screens/HomePage";
import { Profile } from "./screens/Profile";



export type NavigatorParams = {
    Home: undefined;
    Profile: {
        id: string,
    };
};

  const Stack = createNativeStackNavigator<NavigatorParams>();

type NavigationProps = {
    state: AppState;
    ToggleOptions: () => void;
}

export const MainNavigation: FC<NavigationProps> = ({state, ToggleOptions}) => {

    const navigationRef = useNavigationContainerRef();
    
    return (
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator screenOptions={{
            headerTintColor: state.theme.colors.text,
            headerStyle: {backgroundColor: state.theme.colors.primary},
            headerTitleStyle: {fontWeight: 'bold'},
            headerRight: () => (
              <Button onPress={ToggleOptions} title={"press"}></Button>
              ),}}>
              <Stack.Screen name='Home' component={HomePage}/>
              <Stack.Screen name='Profile' component={Profile}/>
          </Stack.Navigator>
        </NavigationContainer>
    )
}