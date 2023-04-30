export class TileData {
  tileId: string;
  iconId: number;

  constructor(
    tileId: string = '',
    iconId: number = NaN,
  ) {
    this.tileId = tileId;
    this.iconId = iconId;
  }
}