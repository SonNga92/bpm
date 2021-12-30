import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from '../../../../components/InputField';
import { Button, Grid, Paper } from '@material-ui/core';
import { Wrapper } from '../../styles';
import InputAutocomplete from '../../../../components/InputAutocomplete';
import { cloneDeep } from 'lodash';

const SearchForm = (props) => {
  const { statusSelect, onSearch } = props;

  const defaultValues = {
    fullname: '',
    acctNo: '',
    balance: '',
    holdBalance: '',
    availableBalance: '',
    synStatus: null
  };

  const { control, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(
      Yup.object({
        fullname: Yup.string(),
        acctNo: Yup.string(),
        balance: Yup.string(),
        holdBalance: Yup.string(),
        availableBalance: Yup.string(),
        synStatus: Yup.object().nullable()
      })
    )
  });

  const onReset = () => {
    reset(cloneDeep(defaultValues));
  };

  const onSubmit = (value) => {
    value && onSearch(value);
    // console.log(value);
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
              <InputField
                control={control}
                name="balance"
                label="Tổng tài khoản"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="holdBalance"
                label="Tổng tiền hold"
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                control={control}
                name="availableBalance"
                label="Tài khoản khả dụng"
              />
            </Grid>
            <Grid item xs={4}>
              <InputAutocomplete
                control={control}
                options={statusSelect}
                name="synStatus"
                label="Trạng thái"
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
