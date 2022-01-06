import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from '../../../../components/InputField';
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { Wrapper } from '../../styles';
import InputAutocomplete from '../../../../components/InputAutocomplete';
import { format, isDate } from 'date-fns';

const SearchForm = (props) => {
  const { getTableData, onSearch, statusSelect, tableData } = props;
  const { pageIndex, pageSize, totalCount, data, loading, searchValues } =
    tableData;
  const defaultValues = {
    fullname: '',
    acctNo: '',
    idcode: '',
    custid: '',
    synStatus: null
  };

  const { control, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(
      Yup.object({
        fullname: Yup.string(),
        acctNo: Yup.string().trim(),
        idcode: Yup.string().trim(),
        custid: Yup.string().trim(),
        synStatus: Yup.object().nullable()
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="fullname"
                label="Tên khách hàng"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="acctNo"
                label="Số tài khoản"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField control={control} name="idcode" label="Id Code" />
            </Grid>
            <Grid item xs={4}>
              <InputField control={control} name="custid" label="Cus Id" />
            </Grid>
            {/* <Grid item xs={4}>
              <InputAutocomplete
                control={control}
                options={statusSelect}
                name="synStatus"
                label="Trạng thái"
              />
            </Grid> */}
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
