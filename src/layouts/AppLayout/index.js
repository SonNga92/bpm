import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header';
import MenuList from './components/MenuList';

const AppLayout = ({ children }) => {
  const drawerWidth = 220;
  const useStyles = useMemo(() =>
    makeStyles((theme) => ({
      root: {
        display: 'flex'
      },
      appBar: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        })
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
      },
      menuButton: {
        marginRight: theme.spacing(3)
      },
      drawer: {
        minWidth: drawerWidth,
        flexShrink: 0
      },
      drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#004d40'
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
      },
      listItemText: {
        color: '#fff'
      }
    }))
  );
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header classes={classes} handleOpen={handleOpen} open={open} />
      <MenuList classes={classes} open={open} />
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />

        <div>{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
