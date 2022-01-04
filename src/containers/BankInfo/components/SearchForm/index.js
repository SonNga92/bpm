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
    bank_id: '',
    bankName: '',
    shortName: '',
    vpbBankId: '',
    citadBankId: '',
    cityName: '',
    cityShortname: '',
    bankFullname: '',
    bankShortname: '',
    dateFrom: null,
    dateTo: null
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
    console.log('searchValues', searchValues);
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
              <InputField control={control} name="bank_id" label="Mã bank" />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="bankName"
                label="Tên ngân hàng"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="shortName"
                label="Mã ngân hàng"
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
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="cityName"
                label="Tên thành phố"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="cityShortname"
                label="Mã thành phố"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="bankFullname"
                label="Tên ngân hàng đầy đủ"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="bankShortname"
                label="Mã ngân hàng"
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
