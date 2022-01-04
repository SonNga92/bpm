import { TextField, withStyles } from '@material-ui/core';
import { Controller } from 'react-hook-form';

const InputField = (props) => {
  const { control, name, label, disabled, ...restProps } = props;
  return (
    <Controller
      name={name}
      control={control}
      {...restProps}
      render={({
        field: { onBlur, onChange, ref, value },
        fieldState: { error }
      }) => (
        <TextField
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
          inputRef={ref}
          value={value}
          disabled={!!disabled}
          id="outlined-basic"
          label={label}
          variant="outlined"
          size="small"
          error={!!error}
          helperText={error && error.message}
          fullWidth
        />
      )}
    />
  );
};

export default InputField;
