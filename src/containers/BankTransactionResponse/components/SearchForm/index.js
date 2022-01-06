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
    id: '',
    refNo: '',
    ftId: '',
    uuid: '',
    transferResult: '',
    // requestDate: '',
    // responseDate: '',
    // bankRequestDate: '',
    // bankTranferDate: '',
    finalResult: '',
    lastResult: '',
    actionNo: '',
    // txdate: '',
    txnum: '',
    switchCode: ''
  };

  const { control, handleSubmit, reset } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(
      Yup.object({
        id: Yup.string()
          .trim()
          .matches(/^[0-9]*$/, 'Sai định dạng'),
        refNo: Yup.string().trim(),
        ftId: Yup.string().trim(),
        uuid: Yup.string().trim(),
        transferResult: Yup.string().trim(),
        finalResult: Yup.string().trim(),
        lastResult: Yup.string().trim(),
        actionNo: Yup.string().trim(),
        txnum: Yup.string().trim(),
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
        <Typography variant="h6">Tìm kiếm</Typography>

        <div style={{ padding: '5px' }} />
        <Divider />
        <div style={{ padding: '10px' }} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* <Grid item xs={4}>
              <InputField control={control} name="id" label="Id" />
            </Grid> */}
            <Grid item xs={4}>
              <InputField control={control} name="refNo" label="refNo" />
            </Grid>
            <Grid item xs={4}>
              <InputField control={control} name="ftId" label="ftId" />
            </Grid>
            <Grid item xs={4}>
              <InputField control={control} name="uuid" label="uuid request" />
            </Grid>
            {/* <Grid item xs={4}>
              <InputField
                control={control}
                name="requestDate"
                label="Thời gian gửi bản tin đi"
              />
            </Grid> */}
            {/* <Grid item xs={4}>
              <InputField
                control={control}
                name="responseDate"
                label="Thời gian client nhận"
              />
            </Grid> */}
            {/* <Grid item xs={4}>
              <InputField
                control={control}
                name="bankRequestDate"
                label="Thời gian nhận từ middleware"
              />
            </Grid> */}
            {/* <Grid item xs={4}>
              <InputField
                control={control}
                name="bankTranferDate"
                label="Thời gian giao dịch từ core banking"
              />
            </Grid> */}
            {/* <Grid item xs={4}>
              <InputField
                control={control}
                name="finalResult"
                label="Trạng thái cuối cùng"
              />
            </Grid> */}
            {/* <Grid item xs={4}>
              <InputField
                control={control}
                name="lastResult"
                label="Last Result"
              />
            </Grid> */}
            {/* <Grid item xs={4}>
              <InputField control={control} name="actionNo" label="Action No" />
            </Grid> */}
            {/* <Grid item xs={4}>
              <InputField control={control} name="txdate" label="tx date" />
            </Grid> */}
            <Grid item xs={4}>
              <InputField control={control} name="txnum" label="tx num" />
            </Grid>

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
