import { GridObject, NeighbourDirection } from "./Types";
//[x, y]
const NeighbourDirections: readonly NeighbourDirection[] = [
  { direction: "top", x: 0, y: 1 },
  { direction: "topRight", x: 1, y: 1 },
  { direction: "right", x: 1, y: 0 },
  { direction: "bottomRight", x: 1, y: -1 },
  { direction: "bottom", x: 0, y: -1 },
  { direction: "bottomLeft", x: -1, y: -1 },
  { direction: "left", x: -1, y: 0 },
  { direction: "topLeft", x: -1, y: 1 },
];

//Euclidean Heuristik
function calculateHeuristic(a: GridObject, b: GridObject): number {
  const dx = Math.pow(a.x - b.x, 2);
  const dy = Math.pow(a.y - b.y, 2);
  return Math.sqrt(dx + dy);
}

export function getNeighbours(
  node: GridObject,
  gridTiles: GridObject[][],
  sizeX: number,
  sizeY: number,
  endNode: GridObject
): GridObject[] {
  let neighbours: GridObject[] = [];

  //Go through all possible directions where a neigbour can be
  for (const dir of NeighbourDirections) {
    //calculate the new positions
    const newXPosition = node.x + dir.x;
    const newYPosition = node.y + dir.y;

    //If there is no neighbour
    if (
      newXPosition >= sizeX ||
      newXPosition < 0 ||
      newYPosition >= sizeY ||
      newYPosition < 0
    )
      continue;

    //Get the neighbour
    const neighbour = gridTiles[newXPosition][newYPosition];

    if (neighbour.isObstacle) continue;

    //calculate the g
    const cost = dir.x !== 0 && dir.y !== 0 ? 1.4 : 1;
    const tentativeG = neighbour.g === Infinity ? cost : node.g + cost;

    //If we have a better path
    if (tentativeG < neighbour.g) {
      neighbour.g = tentativeG;
      neighbour.h = calculateHeuristic(neighbour, endNode);
      neighbour.f = neighbour.g + neighbour.h;
      // Wichtig für Pfad-Rekonstruktion:
      //(neighbour as any).parent = node;
    }

    neighbours.push(neighbour);
  }

  return neighbours;
}
