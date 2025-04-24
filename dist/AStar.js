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
import { getNeighbours, wait } from "./utils.js";
export function AStar(startTile, endTile, gridTiles, sizeX, sizeY) {
    return __awaiter(this, void 0, void 0, function* () {
        let openList = new minHeap();
        let closeList = new Set();
        let currentNode = startTile;
        openList.insert(startTile);
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
            closeList.add(`${currentNode.x}, ${currentNode.y}`);
            currentNode.tile.classList.add("searched");
            const newNodes = getNeighbours(currentNode, gridTiles, sizeX, sizeY, endTile);
            for (let node of newNodes) {
                if (!closeList.has(`${node.x}, ${node.y}`)) {
                    openList.insert(node);
                }
            }
            yield wait(50);
        }
        console.log("No path found.");
    });
}
