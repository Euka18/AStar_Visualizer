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
  let openList = new minHeap(); //Openset of the nodes we are left to look at
  let openSetMap = new Map<string, GridObject>(); //The map for the openlist for faster lookups
  let closeList = new Set<string>(); //The clossets of all nodes that were visited
  let currentNode: GridObject = startTile; //Our start node

  //Set the Startnodes values!
  startTile.g = 0;
  startTile.h = calculateHeuristicManhatten(startTile, endTile);
  startTile.f = startTile.h;
  openList.insert(startTile);
  openSetMap.set(`${startTile.x},${startTile.y}`, startTile);

  while (openList.heap.length > 0) {
    const currentNode = openList.removeMin(); //Get the currently cheapest node

    //Show the best path if we are at the endtile
    if (currentNode === endTile) {
      let pathNode: GridObject | null = currentNode;

      //Go backwards all the parents up
      while (pathNode && pathNode !== startTile) {
        pathNode.tile.classList.add("path");
        pathNode = pathNode.parent;
      }
      return;
    }

    //Add the currently visited node to the closlist
    closeList.add(`${currentNode.x},${currentNode.y}`);
    currentNode.tile.classList.add("searched");

    //Get the neighbours of the currently visited node
    const newNodes = getNeighbours(
      currentNode,
      gridTiles,
      sizeX,
      sizeY,
      endTile
    );

    //Iterate over all neighbours of the currently visited node
    for (let node of newNodes) {
      const key = `${node.x},${node.y}`; //create its key

      if (closeList.has(key)) continue; //Check if it was already visited, than skip it!

      //Take the node out of the map if it exists! (lookup of O(1) because of the hashing)
      const existingNode = openSetMap.get(key);

      //If the node is not in the open list
      if (!existingNode) {
        //Node is not in the openlist
        openList.insert(node);
        openSetMap.set(key, node);
      } else if (node.g < existingNode.g) {
        //Found better path to this node? Update its values and parent
        existingNode.g = node.g;
        existingNode.h = node.h;
        existingNode.f = node.f;
        existingNode.parent = node.parent;
      }
    }

    await wait(50); //Simulate thread sleep
  }

  console.log("No path found.");
}
