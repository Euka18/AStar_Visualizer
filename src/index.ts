const grid: HTMLDivElement = document.querySelector(".grid")!;

interface GridObject {
  f: number;
  g: number;
  h: number;
  x: number;
  y: number;
  isObstacle: boolean;
  tile: HTMLDivElement;
}

let gridTiles: GridObject[][] = [];

function handleTileClick(e: MouseEvent, gridTile: GridObject) {
  if (e.buttons != 2) return;

  if (!gridTile.isObstacle) {
    gridTile.tile.classList.add("obstacle");
    gridTile.isObstacle = true;
  } else {
    gridTile.tile.classList.remove("obstacle");
    gridTile.isObstacle = false;
  }
}

function setupGrid(sizeX: number, sizeY: number) {
  for (let y = sizeY - 1; y >= 0; y--) {
    for (let x = 0; x < sizeX; x++) {
      if (!gridTiles[x]) gridTiles[x] = [];

      const tile = document.createElement("div");
      tile.classList.add("tile");
      grid.appendChild(tile);

      const gridTile: GridObject = {
        f: Infinity,
        g: Infinity,
        h: Infinity,
        x,
        y,
        isObstacle: false,
        tile,
      };

      tile.addEventListener("mouseover", (e) => handleTileClick(e, gridTile));
      gridTiles[x][y] = gridTile; //Add the new created tile to the list
    }
  }
}
setupGrid(30, 30);
