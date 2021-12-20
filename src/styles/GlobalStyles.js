import { createTheme } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';
import { createGlobalStyle } from 'styled-components';

const theme = createTheme({
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
