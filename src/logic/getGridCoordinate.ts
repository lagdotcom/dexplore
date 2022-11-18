import getGridSize from "./getGridSize";

export default function getGridCoordinate(
  xo: number,
  yo: number,
  zoom: number,
  e: {
    clientX: number;
    clientY: number;
  }
): [x: number, y: number] {
  const gridSize = getGridSize(zoom);
  const x = Math.round((e.clientX - xo) / gridSize);
  const y = Math.round((e.clientY - yo) / gridSize);

  return [x, y];
}
