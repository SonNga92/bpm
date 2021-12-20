import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from '../styles/GlobalStyles';
import './styles/globals.css';

function MyApp({ Component, pageProps }) {
  console.log(theme);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
