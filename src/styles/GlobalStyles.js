import { createTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { createGlobalStyle } from 'styled-components';

const theme = createTheme({
  palette: {
    primary: {
      main: teal[700]
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
});

const GlobalStyles = createGlobalStyle`
    html,
    body,
`;

export default { GlobalStyles, theme };
