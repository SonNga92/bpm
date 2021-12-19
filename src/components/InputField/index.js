import { TextField } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';

const InputField = (props) => {
  const { control, name, label, variant } = props;
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-basic"
            label={label}
            variant="outlined"
            size="small"
            fullWidth
          />
        )}
      />
    </>
  );
};

export default InputField;
