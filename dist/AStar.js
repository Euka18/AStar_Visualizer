var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { minHeap } from "./minHeap.js";
import { calculateHeuristicManhatten, getNeighbours, wait } from "./utils.js";
export function AStar(startTile, endTile, gridTiles, sizeX, sizeY) {
    return __awaiter(this, void 0, void 0, function* () {
        let openList = new minHeap();
        let openSetMap = new Map();
        let closeList = new Set();
        let currentNode = startTile;
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
                let pathNode = currentNode;
                while (pathNode && pathNode !== startTile) {
                    pathNode.tile.classList.add("path");
                    pathNode = pathNode.parent;
                }
                return;
            }
            closeList.add(`${currentNode.x},${currentNode.y}`);
            currentNode.tile.classList.add("searched");
            const newNodes = getNeighbours(currentNode, gridTiles, sizeX, sizeY, endTile);
            for (let node of newNodes) {
                const key = `${node.x},${node.y}`;
                if (closeList.has(key))
                    continue;
                //Take the node out of the map (lookup of O(1) because of the hashing)
                const existingNode = openSetMap.get(key);
                if (!existingNode) {
                    //Node is not in the openlist
                    openList.insert(node);
                    openSetMap.set(key, node);
                }
                else if (node.g < existingNode.g) {
                    //Found better path
                    existingNode.g = node.g;
                    existingNode.h = node.h;
                    existingNode.f = node.f;
                    existingNode.parent = node.parent;
                    openList.insert(existingNode);
                }
            }
            yield wait(50);
        }
        console.log("No path found.");
    });
}
