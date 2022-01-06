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
import InputDatePicker from '../../components/InputDatePicker';
import InputCurrency from '../../components/InputCurrency';
import { GlobalWrapper } from '../../styles/styles';
import useTable from './components/hooks/useTable';

const BankNotificationInbound = () => {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState('');
  const [editId, setEditId] = useState('');
  const [disabledInput, setDisabledInput] = useState(false);

  const { tableData, getTableData, onSearch, onDelete, onAdd, onEdit } =
    useTable();

  const defaultValues = {
    id: '',
    accountNo: '',
    vanAccountNo: '',
    payerName: '',
    amount: '',
    transactionDate: null,
    bookingDate: null,
    ftId: '',
    reamark: '',
    reamark: '',
    createdAt: null,
    state: '',
    errorcode: '',
    switchCode: ''
  };

  const { control, handleSubmit, reset, setValue } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(
      Yup.object({
        accountNo: Yup.string().trim().required('Trường bắt buộc'),
        vanAccountNo: Yup.string().trim().required('Trường bắt buộc'),
        payerName: Yup.string().trim().required('Trường bắt buộc'),
        amount: Yup.string().trim().required('Trường bắt buộc'),
        transactionDate: Yup.date()
          .nullable()
          // .typeError('Sai định dạng')
          .max(Date(new Date()), 'Ngày nhập không lớn hơn ngày hiện tại'),
        bookingDate: Yup.date()
          .nullable()
          // .typeError('Sai định dạng')
          .max(Date(new Date()), 'Ngày nhập không lớn hơn ngày hiện tại'),
        ftId: Yup.string().trim().required('Trường bắt buộc'),
        reamark: Yup.string().trim().required('Trường bắt buộc'),
        reamark: Yup.string().trim().required('Trường bắt buộc'),
        createdAt: Yup.date()
          .nullable()
          // .typeError('Sai định dạng')
          .max(Date(new Date()), 'Ngày nhập không lớn hơn ngày hiện tại'),
        state: Yup.string().trim().required('Trường bắt buộc'),
        errorcode: Yup.string().trim().required('Trường bắt buộc'),
        switchCode: Yup.string().trim().required('Trường bắt buộc')
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
      setValue('id', values.id);
      setValue('accountNo', values.accountNo);
      setValue('vanAccountNo', values.vanAccountNo);
      setValue('payerName', values.payerName);
      setValue('amount', values.amount);
      setValue('transactionDate', values.transactionDate);
      setValue('bookingBate', values.bookingBate);
      setValue('bookingBate', values.bookingBate);
      setValue('ftId', values.ftId);
      setValue('reamark', values.reamark);
      setValue('reamark', values.reamark);
      setValue('createdAt', values.createdAt);
      setValue('state', values.state);
      setValue('errorcode', values.errorcode);
      setValue('switchCode', values.switchCode);
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
    onCloseForm();
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
        // handleAdd={handleAdd}
      />

      <Dialog
        open={open}
        onClose={onCloseForm}
        maxWidth="lg"
        fullWidth
        style={{ minHeight: '60%' }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          aria-labelledby="form-dialog-title"
          style={{ margin: '0 50px' }}
        >
          {formType === 'add' && <DialogTitle>Thêm notification</DialogTitle>}
          {formType === 'edit' && (
            <DialogTitle>Cập nhật thông tin notification</DialogTitle>
          )}
          {formType === 'view' && (
            <DialogTitle>Thông tin notification</DialogTitle>
          )}

          <Divider variant="middle" />
          <div style={{ padding: '10px' }} />

          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="id"
                  label="Id"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="accountNo"
                  label="Tài khoản master account - VPB"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="vanAccountNo"
                  label="Số tài khoản VAN"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputCurrency
                  control={control}
                  name="amount"
                  label="Số tiền ghi nợ/ có"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputDatePicker
                  control={control}
                  name="transactionDate"
                  label="Transaction Date"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputDatePicker
                  control={control}
                  name="bookingDate"
                  label="Thời gian ghi nhận giao dịch"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="ftId"
                  label="Số FT"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputDatePicker
                  control={control}
                  name="createdAt"
                  label="Thời gian client nhận YC"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="state"
                  label="State"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="errorcode"
                  label="Mô tả cho state của giao dịch"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="Switch Code"
                  label="Mã ngân hàng"
                  disabled={disabledInput}
                />
              </Grid>

              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="reamark"
                  label="Diễn giải"
                  disabled={disabledInput}
                  multiline={true}
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

export default BankNotificationInbound;
