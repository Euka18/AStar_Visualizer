import { minHeap } from "./minHeap.ts";
import { GridObject } from "./Types.ts";
import { calculateHeuristic, getNeighbours, wait } from "./utils.ts";

// export async function AStar(
//   startTile: GridObject,
//   endTile: GridObject,
//   gridTiles: GridObject[][],
//   sizeX: number,
//   sizeY: number
// ) {
//   let openList = new minHeap();
//   let closeSet = new Set<string>();

//   //Calculate for the startile g, h and f
//   startTile.g = 0;
//   startTile.h = calculateHeuristic(startTile, endTile);
//   startTile.f = startTile.g + startTile.h;
//   openList.insert(startTile);

//   while (openList.heap.length > 0) {
//     let currentNode = openList.removeMin();
//     const key = `${currentNode.x},${currentNode.y}`;
//     if (closeSet.has(key)) continue;

//     if (currentNode === endTile) {
//       console.log("Path found!");
//       return;
//     }

//     closeSet.add(key);
//     currentNode.tile.classList.add("searched");

//     const neighbours = getNeighbours(
//       currentNode,
//       gridTiles,
//       sizeX,
//       sizeY,
//       endTile
//     );

//     for (let neighbour of neighbours) {
//       if (!closeSet.has(`${neighbour.x},${neighbour.y}`)) {
//         openList.insert(neighbour);
//       }
//     }

//     await wait(100);
//   }

//   console.log("No path found.");
// }

export async function AStar(
  startTile: GridObject,
  endTile: GridObject,
  gridTiles: GridObject[][],
  sizeX: number,
  sizeY: number
) {
  let openList = new minHeap();
  let closeList = [];
  let currentNode: GridObject = startTile;
  openList.insert(startTile);

  while (openList.heap.length > 0) {
    const currentNode = openList.removeMin();

    if (currentNode === endTile) break;

    closeList.push(currentNode);
    currentNode.tile.classList.add("searched");

    const newNodes = getNeighbours(
      currentNode,
      gridTiles,
      sizeX,
      sizeY,
      endTile
    );

    for (let node of newNodes) {
      if (!closeList.some((n) => n.x === node.x && n.y === node.y)) {
        openList.insert(node);
      }
    }

    await wait(100);
  }

  console.log("No path found.");
}
