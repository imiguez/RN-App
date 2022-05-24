import { StatusBar } from 'expo-status-bar';
import { Animated, Button, Easing, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePage } from './src/screens/HomePage'
import { Profile } from './src/screens/Profile';
import { DefaultTheme, ThemeProvider } from 'styled-components/native';
import { DarkTheme } from './src/themes/DarkTheme';
import { LightTheme } from './src/themes/LightTheme';
import { useEffect, useRef, useState } from 'react';
import { width } from './src/styles/Utils';
import React from 'react';

const Stack = createNativeStackNavigator();
export const LateralMenuContext = React.createContext({
  position: new Animated.Value(width),
  HandleTheme: () => {console.log("")}
});

interface AppState {
  theme: DefaultTheme,
  isLight: boolean,
  isOptionsDisplayed: boolean,
  position: Animated.Value
}

export default function App() {
  const navigationRef = useNavigationContainerRef();

  let [state, setState] = useState<AppState>({
    theme: LightTheme,
    isLight: true,
    isOptionsDisplayed: false,
    position: new Animated.Value(width)
  });
  
  const HandleTheme = () => {
    setState(state = {
      theme: (state.isLight ? state.theme = DarkTheme : state.theme = LightTheme),
      isLight: !state.isLight,
      isOptionsDisplayed: state.isOptionsDisplayed,
      position: state.position
    });
  }
  
  const ToggleOptions = () => {
    setState(state = {
      theme: state.theme,
      isLight: state.isLight,
      isOptionsDisplayed: !state.isOptionsDisplayed,
      position: state.position
    });
    if (state.isOptionsDisplayed) {
      Animated.timing(state.position, {
        toValue: width/100*30, 
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(state.position, {
        toValue: width, 
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false
      }).start();
    }
  }
  
  return (
    <LateralMenuContext.Provider value={{position: state.position, HandleTheme: HandleTheme}}>
      <ThemeProvider theme={state.theme}>
        <NavigationContainer ref={navigationRef} fallback={<Text>Loading...</Text>}>
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
      </ThemeProvider>
  </LateralMenuContext.Provider>
  );
}