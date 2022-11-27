import getGridSize from "./getGridSize";

export default function getGridCoordinate(
  xo: number,
  yo: number,
  zoom: number,
  mx: number,
  my: number
): [x: number, y: number] {
  const gridSize = getGridSize(zoom);
  const x = Math.round((mx - xo) / gridSize);
  const y = Math.round((my - yo) / gridSize);

  return [x, y];
}
