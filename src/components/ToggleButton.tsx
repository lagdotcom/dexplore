import { Button } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ isActive?: boolean; onClick?(): void }>;

export default function ToggleButton({
  children,
  isActive = false,
  onClick,
}: Props) {
  return (
    <Button isActive={isActive} onClick={onClick}>
      {children}
    </Button>
  );
}
