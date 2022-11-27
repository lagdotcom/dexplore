import { CSSProperties, ChangeEventHandler, useCallback, useId } from "react";

const fieldStyle: CSSProperties = { display: "flex", width: 300, gap: 4 };
const labelStyle: CSSProperties = {
  fontWeight: "bold",
  width: 40,
  textAlign: "right",
};
const inputStyle: CSSProperties = { flexGrow: 1 };

type FieldProps<T> = { label: string; value: T; setValue(value: T): void };

export function TextField({ label, value, setValue }: FieldProps<string>) {
  const id = useId();
  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => setValue(e.currentTarget.value),
    [setValue]
  );

  return (
    <div style={fieldStyle}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      <input
        id={id}
        style={inputStyle}
        type="string"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

type NumberFieldProps = FieldProps<number> & { min?: number; max?: number };

export function NumberField({
  label,
  value,
  setValue,
  min,
  max,
}: NumberFieldProps) {
  const id = useId();
  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => setValue(e.currentTarget.valueAsNumber),
    [setValue]
  );

  return (
    <div style={fieldStyle}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      <input
        id={id}
        style={inputStyle}
        type="number"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      />
    </div>
  );
}
