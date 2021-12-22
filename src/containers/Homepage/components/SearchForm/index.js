import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from '../../../../components/InputField';
import { Button, Grid, Paper } from '@material-ui/core';
import { Wrapper } from '../../../../styles/Styles';

const SearchForm = (props) => {
  const { handleAdd } = props;

  const defaultValues = {
    firstName: '',
    lastName: '',
    phone: '',
    age: ''
  };

  const { control, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(
      Yup.object({
        firstName: Yup.string().required('Trường bắt buộc'),
        lastName: Yup.string().required('Trường bắt buộc'),
        phone: Yup.string().required('Trường bắt buộc'),
        age: Yup.number('Sai định dạng').required('Trường bắt buộc')
      })
    )
  });

  const onSubmit = (value) => {
    console.log(value);
  };

  return (
    <Paper elevation={3}>
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <InputField
                control={control}
                name="firstName"
                label="Fist name"
              />
            </Grid>
            <Grid item xs={3}>
              <InputField control={control} name="lastName" label="Last name" />
            </Grid>
            <Grid item xs={3}>
              <InputField control={control} name="phone" label="Phone" />
            </Grid>
            <Grid item xs={3}>
              <InputField control={control} name="age" label="Age" />
            </Grid>
          </Grid>
          <div style={{ padding: '10px' }}></div>
          <Grid container justifyContent="flex-end" spacing={1}>
            <Grid item xs={2}>
              <Button size="small" variant="outlined" fullWidth>
                Close
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                size="small"
                variant="contained"
                type="submit"
                color="secondary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Wrapper>
    </Paper>
  );
};

export default SearchForm;
