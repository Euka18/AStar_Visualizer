import { AStar } from "./AStar.js";
import { setupGrid } from "./setup.js";
const grid = document.querySelector(".grid");
const sizeX = 20;
const sizeY = 20;
let gridTiles = setupGrid(grid, sizeX, sizeY);
//Set the start and endpoint!
const startTile = gridTiles[0][sizeY - 1];
startTile.isStart = true;
startTile.tile.classList.add("start");
const endTile = gridTiles[sizeX - 1][0];
endTile.isEnd = true;
endTile.tile.classList.add("end");
document.body.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        AStar(startTile, endTile, gridTiles, sizeX, sizeY);
    }
});
