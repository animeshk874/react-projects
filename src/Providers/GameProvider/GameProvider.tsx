import React, { useEffect, useState } from "react";
import { BOARD_SIZE } from "../../models/constants";
import { TileData } from "../../models/tile";
import { GameInitializer, getFinalScore } from "../../utils/memory-match.utils";

interface GameContextInterface {
  boardData?: TileData[][];
  onClick?: (tileData: TileData) => void;
  firstFlippedTile?: TileData | null;
  secondFlippedTile?: TileData | null;
  solvedTiles?: string[];
  resetBoard?: () => void;
  isGameSolved?: boolean;
  moveCount?: number;
  isScorecardOpen?: boolean;
  time?: number;
  setIsScorecardOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isHelpModalOpen?: boolean;
  setIsHelpModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  finalScore?: number;
}

export const GameContext = React.createContext<GameContextInterface>({});

let timeoutId: NodeJS.Timeout | null;
let intervalId: NodeJS.Timeout | null;
export function GameProvider({
  children
}: { children: JSX.Element }) {
  const [firstFlippedTile, setFirstFlippedTile] = useState<TileData | null>(null);
  const [secondFlippedTile, setSecondFlippedTile] = useState<TileData | null>(null);
  const [boardData, setBoardData] = useState(GameInitializer(BOARD_SIZE));
  const [solvedTiles, setSolvedTiles] = useState<string[]>([]);
  const [isGameSolved, setIsGameSolved] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isScorecardOpen, setIsScorecardOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(0);

  useEffect(() => {
    if(solvedTiles.length === (BOARD_SIZE * BOARD_SIZE)) {
      intervalId && clearInterval(intervalId);
      intervalId = null;
      setFinalScore(getFinalScore(moveCount, time));
      setTimeout(() => {
        setIsGameSolved(true);
        setIsScorecardOpen(true);
      }, 1500);
      
    }
  }, [solvedTiles]);

  const onClick = (tileData: TileData) => {
    if(!intervalId) {
      intervalId = setInterval(() => {
        setTime((time) => time + 1000);
      }, 1000);
    }
    if(timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if((firstFlippedTile && secondFlippedTile) || (!firstFlippedTile && !secondFlippedTile)) {
      setFirstFlippedTile(tileData);
      setSecondFlippedTile(null);
    } else if (firstFlippedTile) {
      setSecondFlippedTile(tileData);
      setMoveCount(moveCount + 1);
      timeoutId = setTimeout(() => {
        setFirstFlippedTile(null);
        setSecondFlippedTile(null);
      }, 3000);
      if(firstFlippedTile.iconId === tileData.iconId){
        setSolvedTiles([
          ...solvedTiles,
          firstFlippedTile.tileId,
          tileData.tileId
        ]);
      }
    }
  }

  const resetBoard = () => {
    setFirstFlippedTile(null);
    setSecondFlippedTile(null);
    setBoardData(GameInitializer(BOARD_SIZE));
    setSolvedTiles([]);
    setIsGameSolved(false);
    setIsGameStarted(false);
    setMoveCount(0);
    setTime(0);
    setFinalScore(0);
  }

  return (
    <GameContext.Provider value={{
        boardData,
        onClick,
        firstFlippedTile,
        secondFlippedTile,
        solvedTiles,
        resetBoard,
        isGameSolved,
        moveCount,
        isScorecardOpen,
        time,
        setIsScorecardOpen,
        isHelpModalOpen,
        setIsHelpModalOpen,
        finalScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}