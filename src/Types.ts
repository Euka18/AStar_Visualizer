export interface GridObject {
  f: number;
  g: number;
  h: number;
  x: number;
  y: number;
  isObstacle: boolean;
  isStart: boolean;
  isEnd: boolean;
  tile: HTMLDivElement;
}

type Directions =
  | "top"
  | "topRight"
  | "right"
  | "bottomRight"
  | "bottom"
  | "bottomLeft"
  | "left"
  | "topLeft";

export interface NeighbourDirection {
  direction: Directions;
  x: number;
  y: number;
}
