import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Refresh from '@material-ui/icons/Refresh';
import Visibility from '@material-ui/icons/Visibility';


export const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} innerRef={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} innerRef={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} innerRef={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} innerRef={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} innerRef={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} innerRef={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} innerRef={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} innerRef={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} innerRef={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} innerRef={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} innerRef={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} innerRef={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} innerRef={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} innerRef={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} innerRef={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} innerRef={ref} />),
  Refresh: forwardRef((props, ref) => <Refresh {...props} innerRef={ref} />),
  Preview: forwardRef((props, ref) => <Visibility {...props} innerRef={ref} />),
};
