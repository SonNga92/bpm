import React from 'react';
import clsx from 'clsx';
import { Menu } from '@material-ui/icons';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';

const Header = (props) => {
  const { classes, handleOpen, open } = props;
  return (
    <>
      <AppBar
        position="fixed"
        color="secondary"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => handleOpen()}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
