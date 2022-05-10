import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string,
      secundary: string,
      text: string,
    };
  }
}
