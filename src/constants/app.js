import {
  Home,
  Receipt,
  Assessment,
  Settings,
  Dashboard
} from '@material-ui/icons';

export const MENU_ITEMS = [
  {
    id: 1,
    displayText: 'Trang chủ',
    path: '/',
    hasNestedMenu: false,
    icon: Home
  },
  {
    id: 2,
    displayText: 'Dashboard',
    path: '/dashboard',
    hasNestedMenu: false,
    icon: Dashboard
  },
  {
    id: 3,
    displayText: 'Account',
    path: '/account',
    hasNestedMenu: false,
    icon: Receipt
  },
  {
    id: 4,
    displayText: 'Bank Info',
    path: '/bank-info',
    hasNestedMenu: false,
    icon: Assessment
  },
  {
    id: 5,
    displayText: 'Báo Cáo',
    path: '/',
    hasNestedMenu: true,
    icon: Settings,
    nestedMenu: [
      {
        id: 5.1,
        displayText: 'Báo Cáo 1',
        icon: Settings,
        path: '/'
      },
      {
        id: 5.2,
        displayText: 'Báo Cáo 1',
        icon: Settings,
        path: '/'
      }
    ]
  }
];
