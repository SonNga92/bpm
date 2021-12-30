import React, { useState, useEffect, useCallback } from 'react';
import Table from './components/Table';
import SearchForm from './components/SearchForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import cloneDeep from 'lodash/cloneDeep';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

  const {
    tableData,
    getTableData,
    onSearch,
    onPageChange,
    onPageSizeChange,
    onDelete,
    onAdd,
    onEdit
  } = useTable();

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
    reset(cloneDeep(defaultValues));
  };

  const onSubmit = (values, e) => {
    if (formType === 'add') {
      onAdd(values);
    }
    if (formType === 'edit') {
      onEdit(values);
    }
    onCloseForm();
  };

  return (
    <GlobalWrapper>
      <SearchForm statusSelect={statusSelect} onSearch={onSearch} />

      <div style={{ padding: '10px' }}></div>

      <Table
        tableData={tableData}
        handleEdit={handleEdit}
        onDelete={onDelete}
        getTableData={getTableData}
        handleAdd={handleAdd}
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
            <Button onClick={onCloseForm} variant="outlined">
              Close
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </GlobalWrapper>
  );
};

export default Account;
