import 'react-native-gesture-handler';
import React from 'react';
import { Animated, Easing } from 'react-native';
import { DefaultTheme, ThemeProvider } from 'styled-components/native';
import { DarkTheme } from './src/themes/DarkTheme';
import { LightTheme } from './src/themes/LightTheme';
import { useState } from 'react';
import { width } from './src/styles/Utils';
import { MainNavigation } from './src/navigators/MainNavigation';
import { LateralMenuContext } from './src/hooks/LateralMenuContext';

export interface AppState {
  theme: DefaultTheme,
  isLight: boolean,
}

export default function App() {
  

  let [state, setState] = useState<AppState>({
    theme: LightTheme,
    isLight: true,
  });
  
  const SwitchTheme = () => {
    setState(state = {
      theme: (state.isLight ? state.theme = DarkTheme : state.theme = LightTheme),
      isLight: !state.isLight,
    });
  }
  
  return (
    <LateralMenuContext.Provider value={{HandleTheme: SwitchTheme}}>
      <ThemeProvider theme={state.theme}>
        <MainNavigation state={state}/>
      </ThemeProvider>
    </LateralMenuContext.Provider>
  );
}