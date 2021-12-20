import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import {
  AppBar,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem as MuiListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core';
import { Menu, Home, Receipt, Assessment, Settings } from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const ListItem = withStyles({
  root: {
    '& .MuiListItem-button:hover': {
      backgroundColor: '#337066'
    }
  }
})(MuiListItem);

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

  return (
    <div className={classes.root}>
      <CssBaseline />
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
            onClick={() => setOpen(!open)}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader} />

        <List>
          <ListItem className={classes.listItem} button key="trangchu">
            <ListItemIcon className={classes.listItemText}>
              <Home />
            </ListItemIcon>
            <ListItemText
              className={classes.listItemText}
              primary="Trang chủ"
            />
          </ListItem>
          <ListItem className={classes.listItem} button key="giaodich">
            <ListItemIcon className={classes.listItemText}>
              <Receipt />
            </ListItemIcon>
            <ListItemText
              className={classes.listItemText}
              primary="Giao dịch"
            />
          </ListItem>
          <ListItem className={classes.listItem} button key="baocao">
            <ListItemIcon className={classes.listItemText}>
              <Assessment />
            </ListItemIcon>
            <ListItemText className={classes.listItemText} primary="Báo cáo" />
          </ListItem>
          <ListItem className={classes.listItem} button key="caidat">
            <ListItemIcon className={classes.listItemText}>
              <Settings />
            </ListItemIcon>
            <ListItemText className={classes.listItemText} primary="Cài đặt" />
          </ListItem>
        </List>
      </Drawer>
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
