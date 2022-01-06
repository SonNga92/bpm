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

const BankTransactionRequest = () => {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState('');
  const [editId, setEditId] = useState('');
  const [disabledInput, setDisabledInput] = useState(false);

  const { tableData, getTableData, onSearch, onDelete, onAdd, onEdit } =
    useTable();

  const defaultValues = {
    id: '',
    uuid: '',
    refNo: '',
    service: '',
    transType: '',
    sourceNo: '',
    targetNo: '',
    amount: '',
    remark: '',
    bankId: '',
    bankCode: '',
    bankName: '',
    benName: '',
    branchCode: '',
    branchName: '',
    branchChannel: '',
    actor: '',
    useragent: '',
    appCode: '',
    approvedAt: '',
    marker: '',
    checker: '',
    approver: '',
    switchCode: '',
    accountNo: '',
    errorMessage: '',
    beneficiaryName: '',
    channel: ''
  };

  const { control, handleSubmit, reset, setValue } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(
      Yup.object({
        id: Yup.string().trim().required('Trường bắt buộc'),
        uuid: Yup.string().trim().required('Trường bắt buộc'),
        refNo: Yup.string().trim().required('Trường bắt buộc'),
        service: Yup.string().trim().required('Trường bắt buộc'),
        transType: Yup.string().trim().required('Trường bắt buộc'),
        sourceNo: Yup.string().trim().required('Trường bắt buộc'),
        targetNo: Yup.string().trim().required('Trường bắt buộc'),
        amount: Yup.string().trim().required('Trường bắt buộc'),
        remark: Yup.string().trim().required('Trường bắt buộc'),
        bankId: Yup.string().trim().required('Trường bắt buộc'),
        bankCode: Yup.string().trim().required('Trường bắt buộc'),
        bankName: Yup.string().trim().required('Trường bắt buộc'),
        benName: Yup.string().trim().required('Trường bắt buộc'),
        branchCode: Yup.string().trim().required('Trường bắt buộc'),
        branchName: Yup.string().trim().required('Trường bắt buộc'),
        branchChannel: Yup.string().trim().required('Trường bắt buộc'),
        actor: Yup.string().trim().required('Trường bắt buộc'),
        useragent: Yup.string().trim().required('Trường bắt buộc'),
        appCode: Yup.string().trim().required('Trường bắt buộc'),
        approvedAt: Yup.string().trim().required('Trường bắt buộc'),
        marker: Yup.string().trim().required('Trường bắt buộc'),
        checker: Yup.string().trim().required('Trường bắt buộc'),
        approver: Yup.string().trim().required('Trường bắt buộc'),
        switchCode: Yup.string().trim().required('Trường bắt buộc'),
        accountNo: Yup.string().trim().required('Trường bắt buộc'),
        errorMessage: Yup.string().trim().required('Trường bắt buộc'),
        beneficiaryName: Yup.string().trim().required('Trường bắt buộc'),
        channel: Yup.string().trim().required('Trường bắt buộc')
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
      setValue('uuid', values.uuid);
      setValue('refNo', values.refNo);
      setValue('service', values.service);
      setValue('transType', values.transType);
      setValue('sourceNo', values.sourceNo);
      setValue('targetNo', values.targetNo);
      setValue('amount', values.amount);
      setValue('remark', values.remark);
      setValue('bankId', values.bankId);
      setValue('bankCode', values.bankCode);
      setValue('bankName', values.bankName);
      setValue('benName', values.benName);
      setValue('branchCode', values.branchCode);
      setValue('branchName', values.branchName);
      setValue('branchChannel', values.branchChannel);
      setValue('actor', values.actor);
      setValue('useragent', values.useragent);
      setValue('appCode', values.appCode);
      setValue('approvedAt', values.approvedAt);
      setValue('marker', values.marker);
      setValue('checker', values.checker);
      setValue('approver', values.approver);
      setValue('switchCode', values.switchCode);
      setValue('accountNo', values.accountNo);
      setValue('errorMessage', values.errorMessage);
      setValue('beneficiaryName', values.beneficiaryName);
      setValue('channel', values.channel);
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
          {formType === 'add' && (
            <DialogTitle>Thêm giao dịch chi hộ</DialogTitle>
          )}
          {formType === 'edit' && (
            <DialogTitle>Cập nhật giao dịch chi hộ</DialogTitle>
          )}
          {formType === 'view' && (
            <DialogTitle>Thông tin giao dịch chi hộ</DialogTitle>
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
                  name="uuid"
                  label="Id của request gửi lên Bank"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="refNo"
                  label="Mã tham chiếu từ kss -> bank"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="service"
                  label="Loại chuyển tiền"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="transType"
                  label="Loại giao dịch"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="sourceNo"
                  label="Tài khoản nguồn"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="targetNo"
                  label="Tài khoản đích nhận"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="amount"
                  label="Số tiền"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="remark"
                  label="Nội dung chuyển khoản"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="bankId"
                  label="Mã ngân hàng"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="bankCode"
                  label="Mã nhân hàng thụ hưởng"
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
                  name="benName"
                  label="Tên chủ tài khoản"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="branchCode"
                  label="Mã chi nhánh"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="branchName"
                  label="Tên chi nhánh"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="branchChannel"
                  label="Kênh chuyển tiền"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="actor"
                  label="username thực hiện giao dịch"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="useragent"
                  label="Địa chỉ IP thực hiện giao dịch"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="appCode"
                  label="Định dang app gửi yêu cầu"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="approvedAt"
                  label="thời gian được approve"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="marker"
                  label="Thông tin của maker tạo giao dịch"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="checker"
                  label="Thông tin checker duyệt giao dịch"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="approver"
                  label="Người duyệt giao dịch"
                  disabled={disabledInput}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="switchCode"
                  label="Mã đơn vị ngân hàng KSS gửi lệnh"
                  disabled={disabledInput}
                />
              </Grid>

              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="accountNo"
                  label="Tài khoản"
                  disabled={disabledInput}
                />
              </Grid>

              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="errorMessage"
                  label="Thông báo"
                  disabled={disabledInput}
                />
              </Grid>

              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="beneficiaryName"
                  label="Beneficiary Name"
                  disabled={disabledInput}
                />
              </Grid>

              <Grid item xs={4}>
                <InputField
                  control={control}
                  name="channel"
                  label="Kênh"
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

export default BankTransactionRequest;
