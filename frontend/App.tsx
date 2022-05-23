import { StatusBar } from 'expo-status-bar';
import { Animated, Button, StyleSheet, Text, View } from 'react-native';
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

export default function App() {
  const navigationRef = useNavigationContainerRef();

  let isOptionsDisplayed = useRef(false).current;
  const position = useRef(new Animated.Value(width)).current;
  
  let [theme, setTheme] = useState<DefaultTheme>(LightTheme);
  const isLight = useRef(true);
  
  const HandleTheme = () => {
    setTheme(isLight.current ? theme = DarkTheme : theme = LightTheme);
    isLight.current = !isLight.current;
  }
  
  const ToggleOptions = () => {
    isOptionsDisplayed = !isOptionsDisplayed;
    if (isOptionsDisplayed) {
      Animated.timing(position, {
        toValue: width/100*30, 
        duration: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(position, {
        toValue: width, 
        duration: 500,
        useNativeDriver: false
      }).start();
    }
  }
  
  return (
    <LateralMenuContext.Provider value={{position: position, HandleTheme: HandleTheme}}>
      <ThemeProvider theme={theme}>
        <NavigationContainer ref={navigationRef} fallback={<Text>Loading...</Text>}>
          <Stack.Navigator screenOptions={{
            headerTintColor: theme.colors.text,
            headerStyle: {backgroundColor: theme.colors.primary},
            headerTitleStyle: {fontWeight: 'bold'},
            headerRight: () => (
              <Button onPress={ToggleOptions} title={"press"}></Button>
              ),}}>
              <Stack.Screen name='Home' component={HomePage}/>
            <Stack.Screen name='Profile' component={Profile} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
  </LateralMenuContext.Provider>
  );
}

              {/* <LateralMenuComp position={position}>
                <Button onPress={() => HandleTheme()} title="Config" color="#918F8C" />
              </LateralMenuComp> */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
