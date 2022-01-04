import { createTheme } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';

const theme = createTheme({
  overrides: {
    MuiSvgIcon: {
      root: {
        height: 'auto'
      }
    },
    MuiOutlinedInput: {
      root: {
        position: 'relative',
        borderRadius: '8px'
      }
    },
    MuiDialogContent: {
      root: {
        overflowY: 'unset'
      }
    },
    MuiDialogActions: {
      root: {
        padding: '16px 24px'
      }
    },
    MuiButton: {
      root: {
        borderRadius: '8px'
      }
    },
    MuiInputBase: {
      root: {
        Mui: {
          disabled: {
            color: 'rgba(0, 0, 0, 0.87)'
          }
        }
      },
      input: {
        color: 'rgba(0, 0, 0, 0.87)'
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
