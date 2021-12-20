import React, { useState, useEffect, forwardRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import MaterialTable from 'material-table';
import {
  Search,
  FilterList,
  Clear,
  FirstPage,
  LastPage,
  ChevronRight,
  ChevronLeft,
  ArrowDownward,
  Remove,
  ViewColumn,
  Edit,
  DeleteOutline
} from '@material-ui/icons';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from '@material-ui/core';
import InputField from '../../components/InputField';
import userApi from '../../api/userApi';

const tableIcons = {
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />)
};
const columns = [
  {
    field: 'firstName',
    title: 'First name'
  },
  {
    field: 'lastName',
    title: 'Last name'
  },
  {
    field: 'phone',
    title: 'Phone'
    // type: 'numeric'
  },
  {
    field: 'age',
    title: 'Age'
    // type: 'numeric'
  }
];

const Homepage = () => {
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [formType, setFormType] = useState('');
  const [editId, setEditId] = useState('');

  const defaultValues = {
    firstName: '',
    lastName: '',
    phone: '',
    age: ''
  };

  const { control, handleSubmit, reset, setValue } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(
      Yup.object({
        firstName: Yup.string().required('Trường bắt buộc'),
        lastName: Yup.string().required('Trường bắt buộc'),
        phone: Yup.string().required('Trường bắt buộc'),
        age: Yup.number('Sai định dạng').required('Trường bắt buộc')
      })
    )
  });

  const actions = [
    {
      icon: tableIcons.Edit,
      tooltip: 'Save User',
      onClick: (event, rowData) => handleEdit(rowData)
    },
    (rowData) => ({
      icon: tableIcons.Delete,
      tooltip: 'Delete User',
      onClick: (event, rowData) => onDelete(rowData)
    })
  ];

  const getTableData = useCallback(async () => {
    try {
      const response = await userApi.getAll({});
      setTableData(response);
    } catch (error) {
      console.log('Failed to fetch table', error);
    }
  }, [tableData]);

  useEffect(() => {
    getTableData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
  };

  const handleEdit = (values) => {
    if (values) {
      setValue('firstName', values.firstName);
      setValue('lastName', values.lastName);
      setValue('phone', values.phone);
      setValue('age', values.age);
      setEditId(values._id);
      handleOpen();
      setFormType('edit');
    }
  };

  const onDelete = async (values) => {
    try {
      if (values._id) {
        await userApi.delete(values);
      }
    } catch (error) {
      console.log('Failed to delete user', error);
    }
    getTableData();
  };

  const handleAdd = () => {
    handleOpen();
    setFormType('add');
  };

  const onAdd = useCallback(async (values) => {
    try {
      if (values) {
        userApi.add(values);
        setTimeout(() => getTableData(), 300);
      }
    } catch (error) {
      console.log('Failed to add user', error);
    }
  }, []);

  const onEdit = useCallback(async (values, editId) => {
    try {
      if (values && editId) {
        userApi.edit(values, editId);
        setTimeout(() => getTableData(), 300);
      }
    } catch (error) {
      console.log('Failed to add user', error);
    }
  }, []);

  const onSubmit = (values, e) => {
    if (formType === 'add') {
      onAdd(values);
    }
    if (formType === 'edit') {
      onEdit(values, editId);
    }
    handleClose();
    reset(defaultValues);
  };

  return (
    <div>
      <Button onClick={handleAdd} variant="contained" color="primary">
        Add user
      </Button>

      <div style={{ padding: '10px' }}></div>

      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          title="Giao  dịch tổng hợp"
          data={tableData}
          icons={tableIcons}
          columns={columns}
          actions={actions}
          options={{
            filtering: true,
            search: false,
            actionsColumnIndex: -1,
            draggable: false
          }}
        />
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formType === 'add' ? (
            <DialogTitle>Add User</DialogTitle>
          ) : (
            <DialogTitle>Update User</DialogTitle>
          )}
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <InputField
                  control={control}
                  name="firstName"
                  label="Fist name"
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  control={control}
                  name="lastName"
                  label="Last name"
                />
              </Grid>
              <Grid item xs={6}>
                <InputField control={control} name="phone" label="Phone" />
              </Grid>
              <Grid item xs={6}>
                <InputField control={control} name="age" label="Age" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              Close
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Homepage;
