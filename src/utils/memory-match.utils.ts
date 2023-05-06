import { BOARD_SIZE, MEMORY_MATCH_SCORES, TIME_FOR_NEGATIVE_SCORE } from "../models/constants";
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

export function getFinalScore(moves: number, time: number) {
  const perfectScore = (Math.pow(BOARD_SIZE, 2) / 2) * MEMORY_MATCH_SCORES.SUCCESS; // this is the best score one can score
  const timeTakenInSeconds = time / 1000;
  const finalScore = perfectScore + (moves - perfectScore) * MEMORY_MATCH_SCORES.FAIL + Math.floor(timeTakenInSeconds / TIME_FOR_NEGATIVE_SCORE) * MEMORY_MATCH_SCORES.TIME;
  return finalScore > 0 ? finalScore : 0;
}

export function getMemoryMatchFinalMessage(score: number) {
  if(score >= 15) {
    return "Fantastic, memory master!";
  } else if(score >= 12) {
    return "Great job, impressive memory.";
  } else if(score >= 9) {
    return "Good effort, keep practicing.";
  } else {
    return "Keep practicing, you'll improve.";
  }
}
