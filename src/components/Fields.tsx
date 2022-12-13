import { ChangeEventHandler, useCallback } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

type FieldProps<T> = {
  label: string;
  readOnly?: boolean;
  value: T;
  setValue(value: T): void;
};

export function TextField({
  label,
  readOnly,
  value,
  setValue,
}: FieldProps<string>) {
  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => setValue(e.currentTarget.value),
    [setValue]
  );

  return (
    <FormControl isReadOnly={readOnly}>
      <FormLabel>{label}</FormLabel>
      <Input value={value} onChange={onChange} />
    </FormControl>
  );
}

type NumberFieldProps = FieldProps<number> & { min?: number; max?: number };

export function NumberField({
  label,
  readOnly,
  value,
  setValue,
  min,
  max,
}: NumberFieldProps) {
  const onChange = useCallback(
    (_: string, value: number) => setValue(value),
    [setValue]
  );

  return (
    <FormControl isReadOnly={readOnly}>
      <FormLabel>{label}</FormLabel>
      <NumberInput value={value} min={min} max={max} onChange={onChange}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
}
