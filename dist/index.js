import { setupGrid } from "./setup.js";
const grid = document.querySelector(".grid");
const sizeX = 25;
const sizeY = 25;
let gridTiles = setupGrid(grid, sizeX, sizeY);
//Set the start and endpoint!
const startTile = gridTiles[0][sizeY - 1];
startTile.isStart = true;
startTile.tile.classList.add("start");
const endTile = gridTiles[sizeX - 1][0];
endTile.isEnd = true;
endTile.tile.classList.add("end");
// getNeighbours(gridTiles[10][10], gridTiles, sizeX, sizeY, endTile).forEach(
//   (tile) => {
//     tile.tile.classList.add("neighbour");
//     console.log(tile);
//   }
// );
// getNeighbours(gridTiles[12][10], gridTiles, sizeX, sizeY, endTile).forEach(
//   (tile) => {
//     tile.tile.classList.add("neighbour");
//     console.log(tile);
//   }
// );
document.body.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        console.log("Hier");
    }
});
