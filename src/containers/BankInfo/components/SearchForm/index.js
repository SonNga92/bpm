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
  const { statusSelect } = props;

  const defaultValues = {
    bank_id: '',
    bankName: '',
    shortName: ''
  };

  const { control, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(
      Yup.object({
        bankName: Yup.string().required('Trường bắt buộc'),
        shortName: Yup.string().required('Trường bắt buộc')
      })
    )
  });

  const onReset = () => {
    reset(cloneDeep(defaultValues));
  };

  const onSubmit = (value) => {
    console.log(value);
  };

  return (
    <Paper elevation={2}>
      <Wrapper>
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
