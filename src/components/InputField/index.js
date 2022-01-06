import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

const InputField = (props) => {
  const {
    control,
    name,
    label,
    disabled,
    inputFieldProps,
    multiline,
    minRows,
    maxRows,
    ...restProps
  } = props;
  return (
    <Controller
      name={name}
      control={control}
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
          multiline={multiline ? true : false}
          minRows={1}
          maxRows={8}
          {...restProps}
        />
      )}
    />
  );
};

export default InputField;
