import getGridSize from "./getGridSize";

export default function getGridCoordinate(
  xo: number,
  yo: number,
  zoom: number,
  mx: number,
  my: number,
  round: (x: number) => number = Math.round
): [x: number, y: number] {
  const gridSize = getGridSize(zoom);
  const x = round((mx - xo) / gridSize);
  const y = round((my - yo) / gridSize);

  return [x, y];
}
