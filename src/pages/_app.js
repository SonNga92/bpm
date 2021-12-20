import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from '../styles/GlobalStyles';
import Head from 'next/head';
import './styles/globals.css';

function MyApp({ Component, pageProps }) {
  console.log(theme);
  return (
    <>
      <Head>
        <title>BPM</title>
        <meta name="viewport" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <Component {...pageProps} />
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  );
}

export default MyApp;
