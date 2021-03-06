import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from '../../../../components/InputField';
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { Wrapper } from '../../styles';
import InputDatePicker from '../../../../components/InputDatePicker';
import { format, isDate } from 'date-fns';
import InputCurrency from '../../../../components/InputCurrency';

const SearchForm = (props) => {
  const { getTableData, onSearch, tableData } = props;
  const { pageIndex, pageSize, totalCount, data, loading } = tableData;

  const defaultValues = {
    serviceCode: '',
    kssAccountNo: '',
    ftId: '',
    analysisResult: '',
    processResult: '',
    flexResponse: '',
    flexResponseDetail: '',
    retryCount: '',
    switchCode: ''
  };

  const { control, handleSubmit, reset } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(
      Yup.object({
        serviceCode: Yup.string().trim(),
        kssAccountNo: Yup.string().trim(),
        ftId: Yup.string().trim(),
        analysisResult: Yup.string().trim(),
        processResult: Yup.string().trim(),
        flexResponse: Yup.string().trim(),
        flexResponseDetail: Yup.string().trim(),
        retryCount: Yup.string().trim(),
        switchCode: Yup.string().trim()
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
        <Typography variant="h6">T??m ki???m</Typography>

        <div style={{ padding: '5px' }} />
        <Divider />
        <div style={{ padding: '10px' }} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="serviceCode"
                label="N???p ti???n cho d???ch v???"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="kssAccountNo"
                label="T??i kho???n tr??n KSS"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="notifyId"
                label="ID notification"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField control={control} name="ftId" label="S??? FT" />
            </Grid>
            {/* <Grid item xs={4}>
              <InputField
                control={control}
                name="analysisResult"
                label="Tr???ng th??i ph??n t??ch"
              />
            </Grid> */}
            {/* <Grid item xs={4}>
              <InputField
                control={control}
                name="processResult"
                label="Tr???ng th??i x??? l??"
              />
            </Grid> */}
            {/* <Grid item xs={4}>
              <InputDatePicker
                control={control}
                name="processDate"
                label="Th???i gian x??? l?? xong"
              />
            </Grid> */}
            <Grid item xs={4}>
              <InputField
                control={control}
                name="flexResponse"
                label="Ph???n h???i c???a flex"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="flexResponseDetail"
                label="Chi ti???t flex"
              />
            </Grid>
            {/* <Grid item xs={4}>
              <InputField
                control={control}
                name="retryCount"
                label="Retry Count"
              />
            </Grid> */}
            {/* <Grid item xs={4}>
              <InputDatePicker
                control={control}
                name="bankTransDate"
                label="Bank Trans Date"
              />
            </Grid>
            <Grid item xs={4}>
              <InputDatePicker
                control={control}
                name="bookingDate"
                label="Booking Date"
              />
            </Grid> */}

            <Grid item xs={4}>
              <InputField
                control={control}
                name="switchCode"
                label="Switch Code"
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
                L??m m???i
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
                T??m ki???m
              </Button>
            </Grid>
          </Grid>
        </form>
      </Wrapper>
    </Paper>
  );
};

export default SearchForm;
