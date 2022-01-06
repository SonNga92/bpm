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
import { GlobalWrapper } from '../../styles/styles';
import useTable from './components/hooks/useTable';
import InputDatePicker from '../../components/InputDatePicker';
import InputCurrency from '../../components/InputCurrency';

const CollectProcess = () => {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState('');
  const [editId, setEditId] = useState('');
  const [disabledInput, setDisabledInput] = useState(false);

  const { tableData, getTableData, onSearch, onDelete, onAdd, onEdit } =
    useTable();

  const defaultValues = {
    serviceCode: '',
    kssAccountNo: '',
    amount: '',
    notifyId: '',
    ft_id: '',
    analysisResult: '',
    processResult: '',
    processDate: Date(new Date()),
    flexResponse: '',
    flexResponseDetail: '',
    targetSystem: '',
    retryCount: '',
    bankTransDate: Date(new Date()),
    bookingDate: Date(new Date()),
    switchCode: ''
  };

  const { control, handleSubmit, reset, setValue } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(
      Yup.object({
        serviceCode: Yup.string().trim().required('Trường bắt buộc'),
        kssAccountNo: Yup.string().trim().required('Trường bắt buộc'),
        amount: Yup.string().trim().required('Trường bắt buộc'),
        notifyId: Yup.string().trim().required('Trường bắt buộc'),
        ftId: Yup.string().trim().required('Trường bắt buộc'),
        analysisResult: Yup.string().trim().required('Trường bắt buộc'),
        processResult: Yup.string().trim().required('Trường bắt buộc'),
        processDate: Yup.date()
          .nullable()
          .typeError('Sai định dạng')
          .max(Date(new Date()), 'Ngày nhập không lớn hơn ngày hiện tại')
          .required('Trường bắt buộc'),
        flexResponse: Yup.string().trim().required('Trường bắt buộc'),
        flexResponseDetail: Yup.string().trim().required('Trường bắt buộc'),
        retryCount: Yup.string().trim().required('Trường bắt buộc'),
        bankTransDate: Yup.date()
          .nullable()
          .typeError('Sai định dạng')
          .max(Date(new Date()), 'Ngày nhập không lớn hơn ngày hiện tại')
          .required('Trường bắt buộc'),
        bookingDate: Yup.date()
          .nullable()
          .typeError('Sai định dạng')
          .max(Date(new Date()), 'Ngày nhập không lớn hơn ngày hiện tại')
          .required('Trường bắt buộc'),
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
      setValue('serviceCode', values.serviceCode);
      setValue('kssAccountNo', values.kssAccountNo);
      setValue('amount', values.amount);
      setValue('notifyId', values.notifyId);
      setValue('ftId', values.ftId);
      setValue('analysisResult', values.analysisResult);
      setValue('processResult', values.processResult);
      setValue('processDate', values.processDate);
      setValue('flexResponse', values.flexResponse);
      setValue('flexResponseDetail', values.flexResponseDetail);
      setValue('targetSystem', values.targetSystem);
      setValue('retryCount', values.retryCount);
      setValue('bankTransDate', values.bankTransDate);
      setValue('bookingDate', values.bookingDate);
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
                  name="serviceCode"
                  label="Nạp tiền cho dịch vụ"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="kssAccountNo"
                  label="Tài khoản trên KSS"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputCurrency
                  control={control}
                  name="amount"
                  label="Số tiền"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="notifyId"
                  label="ID notification"
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
                <InputField
                  control={control}
                  name="analysisResult"
                  label="Trạng thái phân tích"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="processResult"
                  label="Trạng thái xử lý"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputDatePicker
                  control={control}
                  name="processDate"
                  label="Thời gian xử lý xong"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="flexResponse"
                  label="Phản hồi của flex"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="retryCount"
                  label="Retry Count"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputDatePicker
                  control={control}
                  name="bankTransDate"
                  label="Bank Trans Date"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputDatePicker
                  control={control}
                  name="bookingDate"
                  label="Booking Date"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="switchCode"
                  label="Switch Code"
                  disabled={disabledInput}
                />
              </Grid>

              <Grid item xs={8}>
                <InputField
                  control={control}
                  name="flexResponseDetail"
                  label="Chi tiết flex"
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

export default CollectProcess;
