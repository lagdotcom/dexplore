import { Image } from "@chakra-ui/react";

type Props = { url?: string };

export default function ThingPreview({ url }: Props) {
  return <Image boxSize={16} src={url} />;
}
