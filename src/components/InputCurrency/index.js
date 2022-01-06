import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      suffix=" đ"
    />
  );
};

const InputCurrency = (props) => {
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
          InputProps={{
            inputComponent: NumberFormatCustom
          }}
        />
      )}
    />
  );
};

export default InputCurrency;
