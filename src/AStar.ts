import { minHeap } from "./minHeap.ts";
import { GridObject } from "./Types.ts";
import { getNeighbours, wait } from "./utils.ts";

export async function AStar(
  startTile: GridObject,
  endTile: GridObject,
  gridTiles: GridObject[][],
  sizeX: number,
  sizeY: number
) {
  let openList = new minHeap();
  let closeList = new Set<string>();
  let currentNode: GridObject = startTile;
  openList.insert(startTile);

  while (openList.heap.length > 0) {
    const currentNode = openList.removeMin();

    //Show the best path if we are at the endtile
    if (currentNode === endTile) {
      let pathNode: GridObject | null = currentNode;

      while (pathNode && pathNode !== startTile) {
        pathNode.tile.classList.add("path");
        pathNode = pathNode.parent;
      }
      return;
    }

    closeList.add(`${currentNode.x}, ${currentNode.y}`);
    currentNode.tile.classList.add("searched");

    const newNodes = getNeighbours(
      currentNode,
      gridTiles,
      sizeX,
      sizeY,
      endTile
    );

    for (let node of newNodes) {
      if (!closeList.has(`${node.x}, ${node.y}`)) {
        openList.insert(node);
      }
    }

    await wait(50);
  }

  console.log("No path found.");
}
