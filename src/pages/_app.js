import {
  Button,
  CssBaseline,
  IconButton,
  MuiThemeProvider
} from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from '../styles/GlobalStyles';
import { SnackbarProvider } from 'notistack';
import Head from 'next/head';
import './styles/globals.css';
import React, { useEffect } from 'react';
import { Cancel } from '@material-ui/icons';

function MyApp(props) {
  const { Component, pageProps } = props;

  const notistackRef = React.createRef();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

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
          <SnackbarProvider
            ref={notistackRef}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            preventDuplicate
            action={(key) => (
              <IconButton onClick={onClickDismiss(key)}>
                <Cancel style={{ color: '#fff' }} />
              </IconButton>
            )}
          >
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  );
}

export default MyApp;
