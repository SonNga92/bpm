import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Controller } from 'react-hook-form';

const InputDatePicker = (props) => {
  const { control, name, label, disabled, ...restProps } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onBlur, onChange, ref, value },
        fieldState: { error }
      }) => (
        <KeyboardDatePicker
          onBlur={onBlur}
          onChange={(date) => onChange(date)}
          inputRef={ref}
          value={value}
          inputVariant="outlined"
          fullWidth
          label={label}
          size="small"
          error={!!error}
          helperText={error && error.message}
          format="dd/MM/yyyy"
          disableFuture={true}
          disabled={disabled}
        />
      )}
    />
  );
};

export default InputDatePicker;
