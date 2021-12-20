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
  SvgIcon,
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

const LogoKss = () => {
  return (
    <SvgIcon
      viewBox="0 0 140 36"
      style={{ fontSize: '150px', margin: '12px auto' }}
    >
      <svg
        width="140"
        height="36"
        // viewBox="0 0 140 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.76367 18.3887L4.02539 20.1953V25H2.15039V10.7812H4.02539V17.8125L10.3438 10.7812H12.6094L7.01367 17.0605L13.0488 25H10.8027L5.76367 18.3887ZM18.8789 18.6621C17.2708 18.1999 16.099 17.6335 15.3633 16.9629C14.6341 16.2858 14.2695 15.4525 14.2695 14.4629C14.2695 13.3431 14.7155 12.4186 15.6074 11.6895C16.5059 10.9538 17.6712 10.5859 19.1035 10.5859C20.0801 10.5859 20.9492 10.7747 21.7109 11.1523C22.4792 11.5299 23.0716 12.0508 23.4883 12.7148C23.9115 13.3789 24.123 14.1048 24.123 14.8926H22.2383C22.2383 14.0332 21.9648 13.3594 21.418 12.8711C20.8711 12.3763 20.0996 12.1289 19.1035 12.1289C18.179 12.1289 17.4564 12.334 16.9355 12.7441C16.4212 13.1478 16.1641 13.7109 16.1641 14.4336C16.1641 15.013 16.4082 15.5046 16.8965 15.9082C17.3913 16.3053 18.2279 16.6699 19.4062 17.002C20.5911 17.334 21.5156 17.7018 22.1797 18.1055C22.8503 18.5026 23.3451 18.9681 23.6641 19.502C23.9896 20.0358 24.1523 20.6641 24.1523 21.3867C24.1523 22.5391 23.7031 23.4635 22.8047 24.1602C21.9062 24.8503 20.7051 25.1953 19.2012 25.1953C18.2246 25.1953 17.3132 25.0098 16.4668 24.6387C15.6204 24.2611 14.9661 23.7467 14.5039 23.0957C14.0482 22.4447 13.8203 21.7057 13.8203 20.8789H15.7051C15.7051 21.7383 16.0208 22.4186 16.6523 22.9199C17.2904 23.4147 18.14 23.6621 19.2012 23.6621C20.1908 23.6621 20.9492 23.4603 21.4766 23.0566C22.0039 22.653 22.2676 22.1029 22.2676 21.4062C22.2676 20.7096 22.0234 20.1725 21.5352 19.7949C21.0469 19.4108 20.1615 19.0332 18.8789 18.6621Z"
          fill="#FF0505"
        />
        <path
          d="M35.7148 18.6621C34.1068 18.1999 32.9349 17.6335 32.1992 16.9629C31.4701 16.2858 31.1055 15.4525 31.1055 14.4629C31.1055 13.3431 31.5514 12.4186 32.4434 11.6895C33.3418 10.9538 34.5072 10.5859 35.9395 10.5859C36.916 10.5859 37.7852 10.7747 38.5469 11.1523C39.3151 11.5299 39.9076 12.0508 40.3242 12.7148C40.7474 13.3789 40.959 14.1048 40.959 14.8926H39.0742C39.0742 14.0332 38.8008 13.3594 38.2539 12.8711C37.707 12.3763 36.9355 12.1289 35.9395 12.1289C35.015 12.1289 34.2923 12.334 33.7715 12.7441C33.2572 13.1478 33 13.7109 33 14.4336C33 15.013 33.2441 15.5046 33.7324 15.9082C34.2272 16.3053 35.0638 16.6699 36.2422 17.002C37.4271 17.334 38.3516 17.7018 39.0156 18.1055C39.6862 18.5026 40.181 18.9681 40.5 19.502C40.8255 20.0358 40.9883 20.6641 40.9883 21.3867C40.9883 22.5391 40.5391 23.4635 39.6406 24.1602C38.7422 24.8503 37.541 25.1953 36.0371 25.1953C35.0605 25.1953 34.1491 25.0098 33.3027 24.6387C32.4564 24.2611 31.8021 23.7467 31.3398 23.0957C30.8841 22.4447 30.6562 21.7057 30.6562 20.8789H32.541C32.541 21.7383 32.8568 22.4186 33.4883 22.9199C34.1263 23.4147 34.9759 23.6621 36.0371 23.6621C37.0267 23.6621 37.7852 23.4603 38.3125 23.0566C38.8398 22.653 39.1035 22.1029 39.1035 21.4062C39.1035 20.7096 38.8594 20.1725 38.3711 19.7949C37.8828 19.4108 36.9974 19.0332 35.7148 18.6621ZM47.502 25.1953C46.0697 25.1953 44.9043 24.7266 44.0059 23.7891C43.1074 22.8451 42.6582 21.5853 42.6582 20.0098V19.6777C42.6582 18.6296 42.8568 17.6953 43.2539 16.875C43.6576 16.0482 44.2174 15.4036 44.9336 14.9414C45.6562 14.4727 46.4375 14.2383 47.2773 14.2383C48.651 14.2383 49.7188 14.6908 50.4805 15.5957C51.2422 16.5007 51.623 17.7962 51.623 19.4824V20.2344H44.4648C44.4909 21.276 44.7936 22.1191 45.373 22.7637C45.959 23.4017 46.7012 23.7207 47.5996 23.7207C48.2376 23.7207 48.778 23.5905 49.2207 23.3301C49.6634 23.0697 50.0508 22.7246 50.3828 22.2949L51.4863 23.1543C50.6009 24.515 49.2728 25.1953 47.502 25.1953ZM47.2773 15.7227C46.5482 15.7227 45.9362 15.9896 45.4414 16.5234C44.9466 17.0508 44.6406 17.793 44.5234 18.75H49.8164V18.6133C49.7643 17.6953 49.5169 16.9857 49.0742 16.4844C48.6315 15.9766 48.0326 15.7227 47.2773 15.7227ZM57.9609 23.7207C58.6055 23.7207 59.1686 23.5254 59.6504 23.1348C60.1322 22.7441 60.3991 22.2559 60.4512 21.6699H62.1602C62.1276 22.2754 61.9193 22.8516 61.5352 23.3984C61.151 23.9453 60.6367 24.3815 59.9922 24.707C59.3542 25.0326 58.6771 25.1953 57.9609 25.1953C56.5221 25.1953 55.3763 24.7168 54.5234 23.7598C53.6771 22.7962 53.2539 21.4811 53.2539 19.8145V19.5117C53.2539 18.4831 53.4427 17.5684 53.8203 16.7676C54.1979 15.9668 54.7383 15.3451 55.4414 14.9023C56.151 14.4596 56.9876 14.2383 57.9512 14.2383C59.1361 14.2383 60.1191 14.5931 60.9004 15.3027C61.6882 16.0124 62.1081 16.9336 62.1602 18.0664H60.4512C60.3991 17.3828 60.1387 16.8229 59.6699 16.3867C59.2077 15.944 58.6348 15.7227 57.9512 15.7227C57.0332 15.7227 56.3203 16.0547 55.8125 16.7188C55.3112 17.3763 55.0605 18.3301 55.0605 19.5801V19.9219C55.0605 21.1393 55.3112 22.0768 55.8125 22.7344C56.3138 23.3919 57.0299 23.7207 57.9609 23.7207ZM70.7148 23.9551C70.0117 24.7819 68.9798 25.1953 67.6191 25.1953C66.4928 25.1953 65.6335 24.8698 65.041 24.2188C64.4551 23.5612 64.1589 22.5911 64.1523 21.3086V14.4336H65.959V21.2598C65.959 22.8613 66.61 23.6621 67.9121 23.6621C69.2923 23.6621 70.2103 23.1478 70.666 22.1191V14.4336H72.4727V25H70.7539L70.7148 23.9551ZM80.334 16.0547C80.0605 16.0091 79.7643 15.9863 79.4453 15.9863C78.2604 15.9863 77.4564 16.4909 77.0332 17.5V25H75.2266V14.4336H76.9844L77.0137 15.6543C77.6061 14.7103 78.446 14.2383 79.5332 14.2383C79.8848 14.2383 80.1517 14.2839 80.334 14.375V16.0547ZM83.9668 25H82.1602V14.4336H83.9668V25ZM82.0137 11.6309C82.0137 11.3379 82.1016 11.0905 82.2773 10.8887C82.4596 10.6868 82.7266 10.5859 83.0781 10.5859C83.4297 10.5859 83.6966 10.6868 83.8789 10.8887C84.0612 11.0905 84.1523 11.3379 84.1523 11.6309C84.1523 11.9238 84.0612 12.168 83.8789 12.3633C83.6966 12.5586 83.4297 12.6562 83.0781 12.6562C82.7266 12.6562 82.4596 12.5586 82.2773 12.3633C82.1016 12.168 82.0137 11.9238 82.0137 11.6309ZM89.3184 11.875V14.4336H91.291V15.8301H89.3184V22.3828C89.3184 22.806 89.4062 23.125 89.582 23.3398C89.7578 23.5482 90.0573 23.6523 90.4805 23.6523C90.6888 23.6523 90.9753 23.6133 91.3398 23.5352V25C90.8646 25.1302 90.4023 25.1953 89.9531 25.1953C89.1458 25.1953 88.5371 24.9512 88.127 24.4629C87.7168 23.9746 87.5117 23.2812 87.5117 22.3828V15.8301H85.5879V14.4336H87.5117V11.875H89.3184ZM95.373 25H93.5664V14.4336H95.373V25ZM93.4199 11.6309C93.4199 11.3379 93.5078 11.0905 93.6836 10.8887C93.8659 10.6868 94.1328 10.5859 94.4844 10.5859C94.8359 10.5859 95.1029 10.6868 95.2852 10.8887C95.4674 11.0905 95.5586 11.3379 95.5586 11.6309C95.5586 11.9238 95.4674 12.168 95.2852 12.3633C95.1029 12.5586 94.8359 12.6562 94.4844 12.6562C94.1328 12.6562 93.8659 12.5586 93.6836 12.3633C93.5078 12.168 93.4199 11.9238 93.4199 11.6309ZM102.658 25.1953C101.226 25.1953 100.061 24.7266 99.1621 23.7891C98.2637 22.8451 97.8145 21.5853 97.8145 20.0098V19.6777C97.8145 18.6296 98.013 17.6953 98.4102 16.875C98.8138 16.0482 99.3737 15.4036 100.09 14.9414C100.812 14.4727 101.594 14.2383 102.434 14.2383C103.807 14.2383 104.875 14.6908 105.637 15.5957C106.398 16.5007 106.779 17.7962 106.779 19.4824V20.2344H99.6211C99.6471 21.276 99.9499 22.1191 100.529 22.7637C101.115 23.4017 101.857 23.7207 102.756 23.7207C103.394 23.7207 103.934 23.5905 104.377 23.3301C104.82 23.0697 105.207 22.7246 105.539 22.2949L106.643 23.1543C105.757 24.515 104.429 25.1953 102.658 25.1953ZM102.434 15.7227C101.704 15.7227 101.092 15.9896 100.598 16.5234C100.103 17.0508 99.7969 17.793 99.6797 18.75H104.973V18.6133C104.921 17.6953 104.673 16.9857 104.23 16.4844C103.788 15.9766 103.189 15.7227 102.434 15.7227ZM115.031 22.1973C115.031 21.709 114.846 21.3314 114.475 21.0645C114.11 20.791 113.469 20.5566 112.551 20.3613C111.639 20.166 110.913 19.9316 110.373 19.6582C109.839 19.3848 109.442 19.0592 109.182 18.6816C108.928 18.304 108.801 17.8548 108.801 17.334C108.801 16.4681 109.165 15.7357 109.895 15.1367C110.63 14.5378 111.568 14.2383 112.707 14.2383C113.905 14.2383 114.875 14.5475 115.617 15.166C116.366 15.7845 116.74 16.5755 116.74 17.5391H114.924C114.924 17.0443 114.712 16.6178 114.289 16.2598C113.872 15.9017 113.345 15.7227 112.707 15.7227C112.049 15.7227 111.535 15.8659 111.164 16.1523C110.793 16.4388 110.607 16.8132 110.607 17.2754C110.607 17.7116 110.78 18.0404 111.125 18.2617C111.47 18.4831 112.092 18.6947 112.99 18.8965C113.895 19.0983 114.628 19.3392 115.188 19.6191C115.747 19.8991 116.161 20.2376 116.428 20.6348C116.701 21.0254 116.838 21.5039 116.838 22.0703C116.838 23.0143 116.46 23.7728 115.705 24.3457C114.95 24.9121 113.97 25.1953 112.766 25.1953C111.919 25.1953 111.171 25.0456 110.52 24.7461C109.868 24.4466 109.357 24.0299 108.986 23.4961C108.622 22.9557 108.439 22.373 108.439 21.748H110.246C110.279 22.3535 110.52 22.8353 110.969 23.1934C111.424 23.5449 112.023 23.7207 112.766 23.7207C113.449 23.7207 113.996 23.584 114.406 23.3105C114.823 23.0306 115.031 22.6595 115.031 22.1973Z"
          fill="#FFF1F1"
          fill-opacity="0.9"
        />
        <g filter="url(#filter0_d_0_1)">
          <path
            d="M123.5 8C123.5 9.10457 122.605 10 121.5 10C120.395 10 119.5 9.10457 119.5 8C119.5 6.89543 120.395 6 121.5 6C122.605 6 123.5 6.89543 123.5 8Z"
            fill="#1612B1"
          />
          <path
            d="M129.5 14C129.5 15.1046 128.605 16 127.5 16C126.395 16 125.5 15.1046 125.5 14C125.5 12.8954 126.395 12 127.5 12C128.605 12 129.5 12.8954 129.5 14Z"
            fill="#1612B1"
          />
          <path
            d="M135.5 8C135.5 9.10457 134.605 10 133.5 10C132.395 10 131.5 9.10457 131.5 8C131.5 6.89543 132.395 6 133.5 6C134.605 6 135.5 6.89543 135.5 8Z"
            fill="#1612B1"
          />
          <path
            d="M129.5 2C129.5 3.10457 128.605 4 127.5 4C126.395 4 125.5 3.10457 125.5 2C125.5 0.89543 126.395 0 127.5 0C128.605 0 129.5 0.89543 129.5 2Z"
            fill="#1612B1"
          />
          <path
            d="M126.5 5C126.5 6.10457 125.605 7 124.5 7C123.395 7 122.5 6.10457 122.5 5C122.5 3.89543 123.395 3 124.5 3C125.605 3 126.5 3.89543 126.5 5Z"
            fill="#FF0505"
          />
          <path
            d="M126.5 11C126.5 12.1046 125.605 13 124.5 13C123.395 13 122.5 12.1046 122.5 11C122.5 9.89543 123.395 9 124.5 9C125.605 9 126.5 9.89543 126.5 11Z"
            fill="#FF0505"
          />
          <path
            d="M132.5 11C132.5 12.1046 131.605 13 130.5 13C129.395 13 128.5 12.1046 128.5 11C128.5 9.89543 129.395 9 130.5 9C131.605 9 132.5 9.89543 132.5 11Z"
            fill="#FF0505"
          />
          <path
            d="M132.5 5C132.5 6.10457 131.605 7 130.5 7C129.395 7 128.5 6.10457 128.5 5C128.5 3.89543 129.395 3 130.5 3C131.605 3 132.5 3.89543 132.5 5Z"
            fill="#FF0505"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M129.5 6H125.5V10H129.5V6ZM124.5 5V11H130.5V5H124.5Z"
            fill="#FF0505"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_0_1"
            x="115.5"
            y="0"
            width="24"
            height="24"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_0_1"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_0_1"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </SvgIcon>
  );
};

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
        {/* <div className={classes.drawerHeader}>
        </div> */}
        <LogoKss />

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
