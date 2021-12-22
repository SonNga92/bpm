import { createTheme } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';

const theme = createTheme({
  overrides: {
    MuiSvgIcon: {
      root: {
        height: 'auto'
      }
    }
  },
  palette: {
    primary: {
      // light: '#ff7961',
      main: '#004d40'
      // dark: '#ba000d'
    },

    secondary: {
      // light: '#ff7961',
      main: '#e5e5e5'
      // dark: '#ba000d',
      // contrastText: '#000'
    }
  }
});

const GlobalStyles = createGlobalStyle`
    html,
    body,
`;

export { GlobalStyles, theme };
