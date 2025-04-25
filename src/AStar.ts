import { minHeap } from "./minHeap.ts";
import { GridObject } from "./Types.ts";
import { calculateHeuristicManhatten, getNeighbours, wait } from "./utils.ts";

export async function AStar(
  startTile: GridObject,
  endTile: GridObject,
  gridTiles: GridObject[][],
  sizeX: number,
  sizeY: number
) {
  let openList = new minHeap();
  let openSetMap = new Map<string, GridObject>();
  let closeList = new Set<string>();
  let currentNode: GridObject = startTile;

  //Set the Startnodes values!
  startTile.g = 0;
  startTile.h = calculateHeuristicManhatten(startTile, endTile);
  startTile.f = startTile.h;
  openList.insert(startTile);
  openSetMap.set(`${startTile.x},${startTile.y}`, startTile);

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

    closeList.add(`${currentNode.x},${currentNode.y}`);
    currentNode.tile.classList.add("searched");

    const newNodes = getNeighbours(
      currentNode,
      gridTiles,
      sizeX,
      sizeY,
      endTile
    );

    for (let node of newNodes) {
      const key = `${node.x},${node.y}`;

      if (closeList.has(key)) continue;

      //Take the node out of the map if it exists! (lookup of O(1) because of the hashing)
      const existingNode = openSetMap.get(key);

      if (!existingNode) {
        //Node is not in the openlist
        openList.insert(node);
        openSetMap.set(key, node);
      } else if (node.g < existingNode.g) {
        //Found better path
        existingNode.g = node.g;
        existingNode.h = node.h;
        existingNode.f = node.f;
        existingNode.parent = node.parent;
      }
    }

    await wait(50);
  }

  console.log("No path found.");
}
