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
export function AStar(startTile, endTile, gridTiles, sizeX, sizeY) {
    return __awaiter(this, void 0, void 0, function* () {
        let openList = new minHeap();
        let closeList = [];
        let currentNode = startTile;
        openList.insert(startTile);
        while (openList.heap.length > 0) {
            const currentNode = openList.removeMin();
            if (currentNode === endTile)
                break;
            closeList.push(currentNode);
            currentNode.tile.classList.add("searched");
            const newNodes = getNeighbours(currentNode, gridTiles, sizeX, sizeY, endTile);
            for (let node of newNodes) {
                if (!closeList.some((n) => n.x === node.x && n.y === node.y)) {
                    openList.insert(node);
                }
            }
            yield wait(100);
        }
        console.log("No path found.");
    });
}
