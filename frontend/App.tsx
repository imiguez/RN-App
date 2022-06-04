import { Animated, Easing } from 'react-native';
import { DefaultTheme, ThemeProvider } from 'styled-components/native';
import { DarkTheme } from './src/themes/DarkTheme';
import { LightTheme } from './src/themes/LightTheme';
import { useState } from 'react';
import { width } from './src/styles/Utils';
import React from 'react';
import { MainNavigation } from './src/MainNavigation';
import { LateralMenuContext } from './src/hooks/LateralMenuContext';


// export const LateralMenuContext = React.createContext({
//   position: new Animated.Value(width),
//   HandleTheme: () => {console.log("")}
// });

export interface AppState {
  theme: DefaultTheme,
  isLight: boolean,
  isOptionsDisplayed: boolean,
  position: Animated.Value
}

export default function App() {
  

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
        <MainNavigation state={state} ToggleOptions={ToggleOptions}/>
      </ThemeProvider>
  </LateralMenuContext.Provider>
  );
}