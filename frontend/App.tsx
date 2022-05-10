import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { homePage } from './src/screens/HomePage'
import { Profile } from './src/screens/Profile';
import { DefaultTheme, ThemeProvider } from 'styled-components/native';
import { DarkTheme } from './src/themes/DarkTheme';
import { LightTheme } from './src/themes/LightTheme';
import { useState } from 'react';

const Stack = createNativeStackNavigator();


export default function App() {

  let [theme, setTheme] = useState<DefaultTheme>(LightTheme);
  let isLight = true;

  const HandleTheme = () => {
    setTheme(isLight ? theme = DarkTheme : theme = LightTheme);
    isLight = !isLight;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerTintColor: theme.colors.text,
          headerStyle: {backgroundColor: theme.colors.primary},
          headerTitleStyle: {fontWeight: 'bold'},
          headerRight: () => (
            <Button
            onPress={() => HandleTheme()}
            title="Config"
            color="#918F8C"
            />
            ),}}>
          <Stack.Screen name='Home' component={homePage} /> 
          <Stack.Screen name='Profile' component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

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
