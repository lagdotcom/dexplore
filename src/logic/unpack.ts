export default function unpack<T>(source: string): T {
  return JSON.parse(source);
}
