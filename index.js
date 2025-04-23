// const grid = document.querySelector(".grid");
// let gridTiles = [];

// function handleTileClick(e, gridTile) {
//   if (e.buttons != 2) return;

//   if (!gridTile.isObstacle) {
//     gridTile.tile.classList.add("obstacle");
//     gridTile.isObstacle = true;
//   } else {
//     gridTile.tile.classList.remove("obstacle");
//     gridTile.isObstacle = false;
//   }
// }

// function setupGrid(sizeX, sizeY) {
//   for (let y = sizeY - 1; y >= 0; y--) {
//     for (let x = 0; x < sizeX; x++) {
//       if (!gridTiles[x]) gridTiles[x] = [];

//       const tile = document.createElement("div");
//       tile.classList.add("tile");
//       grid.appendChild(tile);

//       const gridTile = {
//         f: Infinity,
//         g: Infinity,
//         h: Infinity,
//         x,
//         y,
//         isObstacle: false,
//         tile,
//       };

//       tile.addEventListener("mouseover", (e) => handleTileClick(e, gridTile));
//       gridTiles[x][y] = gridTile; //Add the new created tile to the list
//     }
//   }
// }
// setupGrid(30, 30);
