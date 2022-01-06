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

const BankTransactionResponse = () => {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState('');
  const [editId, setEditId] = useState('');
  const [disabledInput, setDisabledInput] = useState(false);

  const { tableData, getTableData, onSearch, onDelete, onAdd, onEdit } =
    useTable();

  const defaultValues = {
    id: '',
    refNo: '',
    ftId: '',
    uuid: '',
    transferResult: '',
    requestDate: Date(new Date()),
    responseDate: Date(new Date()),
    bankRequestDate: Date(new Date()),
    bankTranferDate: Date(new Date()),
    finalResult: '',
    lastResult: '',
    actionNo: '',
    txdate: Date(new Date()),
    txnum: '',
    switchCode: ''
  };

  const { control, handleSubmit, reset, setValue } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(
      Yup.object({
        id: Yup.string()
          .nullable()
          .trim()
          .matches(/^[0-9]*$/, 'Sai định dạng')
          .required('Trường bắt buộc'),
        refNo: Yup.string().nullable().trim().required('Trường bắt buộc'),
        ftId: Yup.string().nullable().trim().required('Trường bắt buộc'),
        uuid: Yup.string().nullable().trim().required('Trường bắt buộc'),
        transferResult: Yup.string()
          .nullable()
          .trim()
          .required('Trường bắt buộc'),
        requestDate: Yup.date()
          .nullable()
          .typeError('Sai định dạng')
          .max(Date(new Date()), 'Ngày nhập không lớn hơn ngày hiện tại'),
        responseDate: Yup.date()
          .nullable()
          .typeError('Sai định dạng')
          .max(Date(new Date()), 'Ngày nhập không lớn hơn ngày hiện tại'),
        bankRequestDate: Yup.date()
          .nullable()
          .typeError('Sai định dạng')
          .max(Date(new Date()), 'Ngày nhập không lớn hơn ngày hiện tại'),
        bankTranferDate: Yup.date()
          .nullable()
          .typeError('Sai định dạng')
          .max(Date(new Date()), 'Ngày nhập không lớn hơn ngày hiện tại'),
        finalResult: Yup.string().nullable().trim().required('Trường bắt buộc'),
        lastResult: Yup.string().nullable().trim().required('Trường bắt buộc'),
        actionNo: Yup.string().nullable().trim().required('Trường bắt buộc'),
        txdate: Yup.date()
          .nullable()
          .typeError('Sai định dạng')
          .max(Date(new Date()), 'Ngày nhập không lớn hơn ngày hiện tại'),
        txnum: Yup.string().nullable().trim().required('Trường bắt buộc'),
        switchCode: Yup.string().nullable().trim().required('Trường bắt buộc')
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
      setValue('refNo', values.refNo);
      setValue('ftId', values.ftId);
      setValue('uuid', values.uuid);
      setValue('transferResult', values.transferResult);
      setValue('requestDate', values.requestDate);
      setValue('responseDate', values.responseDate);
      setValue('bankRequestDate', values.bankRequestDate);
      setValue('bankTranferDate', values.bankTranferDate);
      setValue('finalResult', values.finalResult);
      setValue('lastResult', values.lastResult);
      setValue('actionNo', values.actionNo);
      setValue('txdate', values.txdate);
      setValue('txnum', values.txnum);
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
                  name="id"
                  label="Id"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="refNo"
                  label="refNo"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="ftId"
                  label="ftId"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="uuid"
                  label="uuid request"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputDatePicker
                  control={control}
                  name="requestDate"
                  label="Thời gian gửi bản tin đi"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputDatePicker
                  control={control}
                  name="responseDate"
                  label="Thời gian client nhận"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputDatePicker
                  control={control}
                  name="bankRequestDate"
                  label="Thời gian nhận từ middleware"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputDatePicker
                  control={control}
                  name="bankTranferDate"
                  label="Thời gian giao dịch từ core banking"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="finalResult"
                  label="Trạng thái cuối cùng"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="lastResult"
                  label="Last Result"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="actionNo"
                  label="Action No"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputDatePicker
                  control={control}
                  name="txdate"
                  label="tx date"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="txnum"
                  label="tx num"
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

export default BankTransactionResponse;
