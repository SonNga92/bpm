import React, { useState, useEffect, useCallback } from 'react';
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
  Grid
} from '@material-ui/core';
import InputField from '../../components/InputField';
import { GlobalWrapper } from '../../styles/styles';
import useTable from './components/hooks/useTable';

const statusSelect = [
  {
    value: 1,
    label: 'Hoạt động'
  },
  {
    value: 2,
    label: 'Bị khoá'
  },
  {
    value: 3,
    label: 'Huỷ'
  }
];

const BankInfo = () => {
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
    bank_id: '',
    bankName: '',
    shortName: ''
  };

  const { control, handleSubmit, reset, setValue, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(
      Yup.object({
        bank_id: Yup.string(),
        bankName: Yup.string(),
        shortName: Yup.string()
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
      setValue('bank_id', values.bank_id);
      setValue('bankName', values.bankName);
      setValue('shortName', values.shortName);
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
      onAdd(values);
    }
    if (formType === 'edit') {
      onEdit(values);
    }
    handleClose();
    reset(defaultValues);
  };

  return (
    <GlobalWrapper>
      <SearchForm statusSelect={statusSelect} />

      <div style={{ padding: '10px' }}></div>

      <Table
        tableData={tableData}
        handleEdit={handleEdit}
        onDelete={onDelete}
        getTableData={getTableData}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />

      <Dialog open={open} onClose={onCloseForm} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formType === 'add' ? (
            <DialogTitle>Thêm tài khoản</DialogTitle>
          ) : (
            <DialogTitle>Cập nhật tài khoản của khách hàng</DialogTitle>
          )}
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="bank_id"
                  label="Mã bank"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="bankName"
                  label="Tên ngân hàng"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="shortName"
                  label="Mã ngân hàng"
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

export default BankInfo;
