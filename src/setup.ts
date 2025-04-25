import { GridObject } from "./Types";

function handleTileClick(e: MouseEvent, gridTile: GridObject) {
  if (e.button !== 0) return;

  if (!gridTile.isObstacle && !gridTile.isStart && !gridTile.isEnd) {
    console.log("Hier");
    gridTile.tile.classList.add("obstacle");
    gridTile.isObstacle = true;
  } else {
    gridTile.tile.classList.remove("obstacle");
    gridTile.isObstacle = false;
  }
}

export function setupGrid(
  grid: HTMLDivElement,
  sizeX: number,
  sizeY: number
): GridObject[][] {
  //First clear grid
  grid.innerHTML = "";
  let gridTiles: GridObject[][] = [];

  for (let y = sizeY - 1; y >= 0; y--) {
    for (let x = 0; x < sizeX; x++) {
      if (!gridTiles[x]) gridTiles[x] = [];

      //Create the tile div
      const tile = document.createElement("div");
      tile.classList.add("tile");
      grid.appendChild(tile);

      //Create the Gridobject
      const gridTile: GridObject = {
        f: Infinity,
        g: Infinity,
        h: Infinity,
        x,
        y,
        isObstacle: false,
        isStart: false,
        isEnd: false,
        parent: null,
        tile,
      };

      tile.addEventListener("mouseover", (e) => {
        if (e.buttons === 1) handleTileClick(e, gridTile);
      });
      gridTiles[x][y] = gridTile; //Add the new created tile to the list
    }
  }

  return gridTiles;
}
