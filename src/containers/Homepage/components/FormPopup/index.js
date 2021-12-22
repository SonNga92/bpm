import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from '../../../../components/InputField';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from '@material-ui/core';

const FormPopup = (props) => {
  const { open, handleClose, formType, onAdd, onEdit } = props;

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

  const onCloseForm = () => {
    handleClose();
    reset(defaultValues);
  };

  const onSubmit = (values, e) => {
    if (formType === 'add') {
      onAdd(values);
    }
    if (formType === 'edit') {
      onEdit(values);
    }
    handleClose();
    reset(defaultValues);
  };

  return (
    <>
      <Dialog open={open} onClose={onCloseForm} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formType === 'add' ? (
            <DialogTitle>Add User</DialogTitle>
          ) : (
            <DialogTitle>Update User</DialogTitle>
          )}
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <InputField
                  control={control}
                  name="firstName"
                  label="Fist name"
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  control={control}
                  name="lastName"
                  label="Last name"
                />
              </Grid>
              <Grid item xs={6}>
                <InputField control={control} name="phone" label="Phone" />
              </Grid>
              <Grid item xs={6}>
                <InputField control={control} name="age" label="Age" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              Close
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default FormPopup;
