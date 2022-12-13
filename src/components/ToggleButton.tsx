import {
  ButtonHTMLAttributes,
  CSSProperties,
  DetailedHTMLProps,
  PropsWithChildren,
  useMemo,
} from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type Props = PropsWithChildren<ButtonProps & { selected?: boolean }>;

export default function ToggleButton({
  children,
  selected = false,
  ...buttonProps
}: Props) {
  const style = useMemo<CSSProperties>(
    () => ({
      backgroundColor: selected ? "yellow" : undefined,
    }),
    [selected]
  );

  return (
    <button
      role="menuitemradio"
      aria-checked={selected}
      style={style}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
