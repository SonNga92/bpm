import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import SearchForm from './components/SearchForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid
} from '@material-ui/core';
import InputField from '../../components/InputField';
import InputAutocomplete from '../../components/InputAutocomplete';
import { GlobalWrapper } from '../../styles/styles';
import useTable from './components/hooks/useTable';

const statusSelect = [
  {
    id: '1',
    label: 'Hoạt động'
  },
  {
    id: '2',
    label: 'Bị khoá'
  },
  {
    id: '3',
    label: 'Huỷ'
  }
];

const Account = () => {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState('');
  const [editId, setEditId] = useState('');
  const [disabledInput, setDisabledInput] = useState(false);

  const { tableData, getTableData, onSearch, onDelete, onAdd, onEdit } =
    useTable();

  const defaultValues = {
    fullname: '',
    acctNo: '',
    balance: '',
    holdBalance: '',
    availableBalance: '',
    synStatus: null
  };

  const { control, handleSubmit, reset, setValue, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(
      Yup.object({
        fullname: Yup.string().required('Trường bắt buộc'),
        acctNo: Yup.string().required('Trường bắt buộc'),
        balance: Yup.string().required('Trường bắt buộc'),
        holdBalance: Yup.string().required('Trường bắt buộc'),
        availableBalance: Yup.string().required('Trường bắt buộc'),
        synStatus: Yup.object().nullable().required('Trường bắt buộc')
      })
    )
  });

  useEffect(() => {
    getTableData();
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    handleOpen();
    setFormType('add');
    setDisabledInput(false);
  };

  const handleEdit = (values, view) => {
    if (values) {
      setValue('fullname', values.fullname);
      setValue('acctNo', values.acctNo);
      setValue('balance', values.balance);
      setValue('holdBalance', values.holdBalance);
      setValue('availableBalance', values.availableBalance);
      setValue('synStatus', values.synStatus);
      setEditId(values.id);
      handleOpen();
      setFormType('edit');
      if (view) {
        setDisabledInput(true);
        setFormType('view');
      } else {
        setDisabledInput(false);
      }
    }
  };

  const onCloseForm = () => {
    handleClose();
    reset(defaultValues);
  };

  const onSubmit = (values, e) => {
    if (formType === 'add') {
      // onAdd(values);
      console.log('add', values);
    }
    if (formType === 'edit') {
      // onEdit(values);
      console.log('edit', values);
    }
    onCloseForm();
  };

  return (
    <GlobalWrapper>
      <SearchForm
        getTableData={getTableData}
        onSearch={onSearch}
        statusSelect={statusSelect}
        tableData={tableData}
      />

      <div style={{ padding: '10px' }}></div>

      <Table
        tableData={tableData}
        handleEdit={handleEdit}
        onDelete={onDelete}
        getTableData={getTableData}
        // handleAdd={handleAdd}
      />

      <Dialog open={open} onClose={onCloseForm} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formType === 'add' && <DialogTitle>Thêm tài khoản</DialogTitle>}
          {formType === 'edit' && (
            <DialogTitle>Cập nhật tài khoản của khách hàng</DialogTitle>
          )}
          {formType === 'view' && (
            <DialogTitle>Thông tin tài khoản</DialogTitle>
          )}

          <Divider variant="middle" />
          <div style={{ padding: '10px' }} />

          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="fullname"
                  label="Tên khách hàng"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="acctNo"
                  label="Số tài khoản"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="balance"
                  label="Tổng tài khoản"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="holdBalance"
                  label="Tổng tiền hold"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="availableBalance"
                  label="Tài khoản khả dụng"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputAutocomplete
                  control={control}
                  options={statusSelect}
                  name="synStatus"
                  label="Trạng thái"
                  disabled={disabledInput}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid item xs={2}>
                <Button
                  onClick={onCloseForm}
                  size="small"
                  variant="outlined"
                  fullWidth
                >
                  Close
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  size="small"
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </form>
      </Dialog>
    </GlobalWrapper>
  );
};

export default Account;
