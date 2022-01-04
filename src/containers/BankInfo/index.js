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
  Divider,
  Grid
} from '@material-ui/core';
import InputField from '../../components/InputField';
import { GlobalWrapper } from '../../styles/styles';
import useTable from './components/hooks/useTable';
import { Wrapper } from './styles';

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
    shortName: '',
    vpbBankId: '',
    citadBankId: '',
    cityName: '',
    cityShortname: '',
    bankFullname: '',
    bankShortname: ''
  };

  const { control, handleSubmit, reset, setValue } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(
      Yup.object({
        bank_id: Yup.string()
          .trim()
          .matches(/^[0-9]*$/, 'Sai định dạng')
          .required('Trường bắt buộc'),
        bankName: Yup.string().trim().required('Trường bắt buộc'),
        shortName: Yup.string().required('Trường bắt buộc'),
        vpbBankId: Yup.string()
          .trim()
          .matches(/^[0-9]*$/, 'Sai định dạng')
          .required('Trường bắt buộc'),
        citadBankId: Yup.string()
          .trim()
          .matches(/^[0-9]*$/, 'Sai định dạng')
          .required('Trường bắt buộc'),
        cityName: Yup.string().trim().required('Trường bắt buộc'),
        cityShortname: Yup.string().trim().required('Trường bắt buộc'),
        bankFullname: Yup.string().trim().required('Trường bắt buộc'),
        bankShortname: Yup.string().trim().required('Trường bắt buộc')
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
      setValue('vpbBankId', values.vpbBankId);
      setValue('citadBankId', values.citadBankId);
      setValue('cityName', values.cityName);
      setValue('cityShortname', values.cityShortname);
      setValue('bankFullname', values.bankFullname);
      setValue('bankShortname', values.bankShortname);
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

  const onSubmit = (values) => {
    if (formType === 'add') {
      // onAdd(values);
      console.log('add', values);
    }
    if (formType === 'edit') {
      // onEdit(values);
      console.log('edit', values);
    }
    handleClose();
    reset(defaultValues);
  };

  return (
    <GlobalWrapper>
      <SearchForm
        getTableData={getTableData}
        onSearch={onSearch}
        tableData={tableData}
      />

      <div style={{ padding: '10px' }} />

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
          {formType === 'add' && <DialogTitle>Thêm ngân hàng</DialogTitle>}
          {formType === 'edit' && (
            <DialogTitle>Cập nhật thông tin ngân hàng</DialogTitle>
          )}
          {formType === 'view' && (
            <DialogTitle>Thông tin ngân hàng</DialogTitle>
          )}

          <Divider variant="middle" />
          <div style={{ padding: '10px' }} />

          <DialogContent>
            <Grid container spacing={2}>
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
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="vpbBankId"
                  label="Mã vpb Bank"
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="citadBankId"
                  label="citadBankId"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="cityName"
                  label="Tên thành phố"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="cityShortname"
                  label="Mã thành phố"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="bankFullname"
                  label="Tên ngân hàng đầy đủ"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="bankShortname"
                  label="Mã ngân hàng"
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

export default BankInfo;
