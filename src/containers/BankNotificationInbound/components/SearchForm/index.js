import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from '../../../../components/InputField';
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { Wrapper } from '../../styles';
import InputDatePicker from '../../../../components/InputCurrency';
import InputCurrency from '../../../../components/InputCurrency';

import { format, isDate } from 'date-fns';

const SearchForm = (props) => {
  const { getTableData, onSearch, tableData } = props;
  const { pageIndex, pageSize, totalCount, data, loading } = tableData;

  const defaultValues = {
    accountNo: '',
    vanAccountNo: '',
    payerName: '',
    ftId: '',
    reamark: '',
    reamark: '',
    state: '',
    errorcode: '',
    switchCode: ''
  };

  const { control, handleSubmit, reset } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(
      Yup.object({
        bank_id: Yup.string()
          .trim()
          .matches(/^[0-9]*$/, 'Sai định dạng'),
        bankName: Yup.string().trim(),
        shortName: Yup.string(),
        vpbBankId: Yup.string()
          .trim()
          .matches(/^[0-9]*$/, 'Sai định dạng'),
        citadBankId: Yup.string()
          .trim()
          .matches(/^[0-9]*$/, 'Sai định dạng'),
        cityName: Yup.string().trim(),
        cityShortname: Yup.string().trim(),
        bankFullname: Yup.string().trim(),
        bankShortname: Yup.string().trim(),
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
                name="accountNo"
                label="Tài khoản master account - VPB"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="vanAccountNo"
                label="Số tài khoản VAN"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField control={control} name="ftId" label="Số FT" />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="reamark"
                label="Diễn giải"
                multiline={true}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="errorcode"
                label="Mô tả cho state của giao dịch"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="switchCode"
                label="Mã ngân hàng"
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
