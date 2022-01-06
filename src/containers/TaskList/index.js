import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { GlobalWrapper } from '../../styles/styles';
import {
  Drawer as MuiDrawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  InboxIcon,
  MailIcon
} from '@material-ui/core';

const Drawer = withStyles({
  root: {
    '& .MuiDrawer-paperAnchorLeft': {
      left: 'unset'
    },
    '& .MuiPaper-root': {
      backgroundColor: 'inherit'
    }
  }
})(MuiDrawer);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: '260px',
    flexShrink: 0
  },
  drawerPaper: {
    width: '240px'
  },
  drawerContainer: {
    overflow: 'auto'
  },
  content: {
    flexGrow: 1
  }
}));

const TaskList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        // style={{ padding: 0 }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button>
              aaaaaaa aaaaaa aaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaa
            </ListItem>
          </List>
        </div>
      </Drawer>
      <div className={classes.content}>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </div>
    </div>
  );
};
export default TaskList;
