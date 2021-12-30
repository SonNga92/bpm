import React, { useCallback, useState } from 'react';
import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import KssLogo from '/public/KssLogo';
import { MENU_ITEMS } from '../../../../constants/app';
import { useRouter } from 'next/router';

import { SvgIcon } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

const MenuList = (props) => {
  const { classes, open } = props;
  const router = useRouter();
  const [nestedMenu, setNestedMenu] = useState(null);
  const [childMenu, setChildMenu] = useState(null);

  const handleClick = useCallback(
    (clickedItem) => () => {
      if (clickedItem?.hasNestedMenu) {
        if (nestedMenu?.parentId === clickedItem.id) {
          setNestedMenu(null);
          setChildMenu(null);
        } else {
          setNestedMenu({
            parentId: clickedItem.id,
            menu: clickedItem.nestedMenu
          });
          setChildMenu(null);
        }
      } else {
        router.push(clickedItem.path);
      }
    },
    [nestedMenu]
  );

  const handleClickNestedMenu = useCallback(
    (clickedItem) => () => {
      if (clickedItem?.hasNestedMenu) {
        if (childMenu?.parentId === clickedItem.id) {
          setChildMenu(null);
        } else {
          setChildMenu({
            parentId: clickedItem.id,
            menu: clickedItem.nestedMenu
          });
        }
      } else {
        router.push(clickedItem.path);
      }
    },
    [childMenu]
  );

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <KssLogo />

      <List>
        {MENU_ITEMS.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem
              button
              onClick={handleClick(item)}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.listItemText}>
                <SvgIcon component={item.icon} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary={item.displayText}
                disableTypography
              />
              {item.hasNestedMenu && (
                <ExpandMore className={classes.listItemText} />
              )}
            </ListItem>
            {item.hasNestedMenu && (
              <Collapse
                in={nestedMenu?.parentId === item.id}
                timout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.nestedMenu.map((nestedItem) => (
                    <React.Fragment key={nestedItem.id}>
                      <ListItem
                        button
                        onClick={handleClickNestedMenu(nestedItem)}
                        className={classes.nestedListItem}
                      >
                        <ListItemIcon className={classes.listItemText}>
                          <SvgIcon component={nestedItem.icon} />
                        </ListItemIcon>
                        <ListItemText
                          className={classes.listItemText}
                          primary={nestedItem.displayText}
                          disableTypography
                        />
                      </ListItem>
                      {nestedItem.hasNestedMenu && (
                        <Collapse
                          in={childMenu?.parentId === nestedItem.id}
                          timout="auto"
                          unmountOnExit
                        >
                          <List
                            component="div"
                            disablePadding
                            className={classes.childListItem}
                          >
                            {nestedItem.nestedMenu.map((childItem) => (
                              <ListItem
                                button
                                key={childItem.id}
                                onClick={handleClickNestedMenu(childItem)}
                              >
                                <ListItemIcon className={classes.listItemText}>
                                  <SvgIcon component={childItem.icon} />
                                </ListItemIcon>
                                <ListItemText
                                  className={classes.listItemText}
                                  primary={childItem.displayText}
                                  disableTypography
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Collapse>
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default MenuList;
