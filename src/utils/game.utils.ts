import { Icon, iconsMapping } from "../models/icon-mapping";
import { TileData } from "../models/tile";

export function GameInitializer(size = 4) {
  const slicedIcons = iconsMapping.slice(0, (size * size) / 2);
  const unusedIcons = slicedIcons.map((icon) => icon.id);
  const unusedIconAvailability: {[key: string]: number} = {};
  unusedIcons.forEach(iconId => unusedIconAvailability[iconId] = 2);
  const boardData = [];

  for(let i = 0; i < size; i++) {
    const rowData = [];
    for(let j = 0; j < size; j++) {
      const randomIconId = getRandomIconIdForTile(unusedIconAvailability, size);
      const tileData = new TileData(`${i}_${j}`, randomIconId);
      rowData.push(tileData);
    }
    boardData.push(rowData);
  }

  return boardData;
}

function getRandomIconIdForTile(unusedIconAvailability: {[key: string]: number}, size: number): number {
  const randomNumber = Math.floor(Math.random() * (size * size) / 2);
  const keyNames = Object.keys(unusedIconAvailability);
  if(unusedIconAvailability[keyNames[randomNumber]] > 0) {
    unusedIconAvailability[keyNames[randomNumber]] = unusedIconAvailability[keyNames[randomNumber]] - 1;
    return +keyNames[randomNumber];
  } else {
    return getRandomIconIdForTile(unusedIconAvailability, size);
  }
}