import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

const InputAutocomplete = (props) => {
  const { control, name, label, options, disabled, ...restProps } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onBlur, onChange, ref, value },
        fieldState: { error }
      }) => (
        <Autocomplete
          onBlur={onBlur}
          onChange={(_, option) => {
            onChange(option);
          }}
          value={value}
          options={options}
          getOptionLabel={(option) => option.label}
          getOptionSelected={(option, value) => option.id === value.id}
          loadingText="Đang tải..."
          noOptionsText="Không có dữ liệu"
          {...restProps}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={ref}
              label={label}
              variant="outlined"
              disabled={!!disabled}
              error={!!error}
              helperText={error && error.message}
              fullWidth
              size="small"
            />
          )}
        />
      )}
    />
  );
};

export default InputAutocomplete;
