import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from '../../../../components/InputField';
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { Wrapper } from '../../styles';
import InputDatePicker from '../../../../components/InputDatePicker';
import { format, isDate } from 'date-fns';

const SearchForm = (props) => {
  const { getTableData, onSearch, tableData } = props;
  const { pageIndex, pageSize, totalCount, data, loading } = tableData;

  const defaultValues = {
    uuid: '',
    refNo: '',
    sourceNo: '',
    targetNo: '',
    remark: '',
    bankCode: '',
    benName: '',
    actor: '',
    accountNo: '',
    dateFrom: null,
    dateTo: null
  };

  const { control, handleSubmit, reset } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(
      Yup.object({
        uuid: Yup.string().trim(),
        refNo: Yup.string().trim(),
        sourceNo: Yup.string(),
        targetNo: Yup.string(),
        remark: Yup.string(),
        bankCode: Yup.string().trim(),
        benName: Yup.string().trim(),
        actor: Yup.string().trim(),
        accountNo: Yup.string().trim(),
        dateFrom: Yup.date()
          .nullable()
          // .typeError('Sai định dạng')
          .max(Date(new Date()), 'Ngày nhập không lớn hơn ngày hiện tại'),
        dateTo: Yup.date()
          .nullable()
          // .typeError('Sai định dạng')
          .max(Date(new Date()), 'Ngày nhập không lớn hơn ngày hiện tại')
        // .when(
        //   'dateFrom',
        //   (dateFrom) =>
        //     dateFrom && Yup.min(dateFrom, 'Đến ngày không nhỏ hơn từ ngày')
        // )
      })
    )
  });

  const onReset = () => {
    reset(defaultValues);
    getTableData();
  };

  const clean = (obj) => {
    for (var prop in obj) {
      if (obj[prop] === null || obj[prop] === undefined || obj[prop] === '') {
        delete obj[prop];
      } else if (isDate(obj[prop])) {
        obj[prop] = format(obj[prop], 'dd-MM-yyyy');
      } else obj[prop] = `like:${obj[prop]}`;
    }
    return obj;
  };

  const onSubmit = (values) => {
    const searchValues = clean(values);
    if (searchValues.dateFrom && searchValues.dateTo) {
      searchValues.createdAt = `between:${searchValues.dateFrom},${searchValues.dateTo}`;
      delete searchValues.dateFrom;
      delete searchValues.dateTo;
    }
    onSearch({ pageindex: pageIndex, pagesize: pageSize }, searchValues);
  };

  return (
    <Paper elevation={2}>
      <Wrapper>
        <Typography variant="h6">Tìm kiếm</Typography>

        <div style={{ padding: '5px' }} />
        <Divider />
        <div style={{ padding: '10px' }} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="uuid"
                label="Id của request gửi lên Bank"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="refNo"
                label="Mã tham chiếu từ kss -> bank"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="sourceNo"
                label="Tài khoản nguồn"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="targetNo"
                label="Tài khoản đích nhận"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="remark"
                label="Nội dung chuyển khoản"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="bankCode"
                label="Mã nhân hàng thụ hưởng"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="benName"
                label="Tên chủ tài khoản"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="actor"
                label="username thực hiện giao dịch"
              />
            </Grid>

            <Grid item xs={4}>
              <InputField
                control={control}
                name="accountNo"
                label="Tài khoản"
              />
            </Grid>
            <Grid item xs={4}>
              <InputDatePicker
                control={control}
                name="dateFrom"
                label="Từ ngày"
              />
            </Grid>
            <Grid item xs={4}>
              <InputDatePicker
                control={control}
                name="dateTo"
                label="Đến ngày"
              />
            </Grid>
          </Grid>
          <div style={{ padding: '10px' }}></div>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item xs={2}>
              <Button
                onClick={onReset}
                size="small"
                variant="outlined"
                fullWidth
              >
                Làm mới
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
                Tìm kiếm
              </Button>
            </Grid>
          </Grid>
        </form>
      </Wrapper>
    </Paper>
  );
};

export default SearchForm;
