import {
  Home,
  Receipt,
  Assessment,
  Settings,
  Dashboard,
  Assignment
} from '@material-ui/icons';

export const MENU_ITEMS = [
  {
    id: 1,
    displayText: 'Trang chủ',
    path: '/',
    hasNestedMenu: false,
    icon: Home
  },
  // {
  //   id: 2,
  //   displayText: 'Dashboard',
  //   path: '/dashboard',
  //   hasNestedMenu: false,
  //   icon: Dashboard
  // },
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
    displayText: 'Bank Transaction Request',
    path: '/bank-transaction-request',
    hasNestedMenu: false,
    icon: Assessment
  },

  {
    id: 6,
    displayText: 'Bank Transaction Response',
    path: '/bank-transaction-response',
    hasNestedMenu: false,
    icon: Assessment
  },

  {
    id: 7,
    displayText: 'Collect Process',
    path: '/collect-process',
    hasNestedMenu: false,
    icon: Assessment
  },
  {
    id: 8,
    displayText: 'Bank Notification Inbound',
    path: '/bank-notification-inbound',
    hasNestedMenu: false,
    icon: Assessment
  }
  // {
  //   id: 9,
  //   displayText: 'Báo Cáo',
  //   path: '/',
  //   hasNestedMenu: true,
  //   icon: Settings,
  //   nestedMenu: [
  //     {
  //       id: 9.1,
  //       displayText: 'Báo Cáo 1',
  //       icon: Settings,
  //       path: '/'
  //     },
  //     {
  //       id: 9.2,
  //       displayText: 'Báo Cáo 1',
  //       icon: Settings,
  //       path: '/'
  //     }
  //   ]
  // },
  // {
  //   id: 10,
  //   displayText: 'Task List',
  //   path: '/task-list',
  //   hasNestedMenu: false,
  //   icon: Assignment
  // }
];
