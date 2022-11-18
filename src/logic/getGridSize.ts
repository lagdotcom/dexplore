const gridDefaultSize = 100;

export default function getGridSize(zoom: number) {
  return gridDefaultSize * zoom;
}
