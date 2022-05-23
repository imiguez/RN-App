import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string,
      softContrast: string,
      hardContrast: string,
      text: string,
      border: string,
    }
  }
}
