import React, { useContext, useMemo, useState } from 'react';
import { TileData } from '../../models/tile';
import { getMinutesSecondsFromMillisecond } from '../../utils/time.utils';
import { GameContext } from '../../Providers/GameProvider/GameProvider';
import Modal from '../Modal/Modal.component';
import ScoreCardModalComponent from './ScoreCardModal/ScoreCardModal.component';
import TileComponent from './TileComponent/TileComponent';
import HelpModal from './HelpModal/HelpModal.component';

function MemoryMatchingGame() {
  const {
    boardData,
    moveCount,
    isScorecardOpen,
    resetBoard,
    time,
    setIsScorecardOpen,
    isHelpModalOpen,
    setIsHelpModalOpen,
    finalScore
  } = useContext(GameContext);

  const formattedTime = useMemo(() => getMinutesSecondsFromMillisecond(time || 0), [time]);

  return (
    <>
      <Modal isModalOpen={!!isScorecardOpen}>
        <ScoreCardModalComponent 
          moves={moveCount || 0}
          formattedTime={formattedTime}
          onNewGame={() => {
            resetBoard?.();
            setIsScorecardOpen?.(false);
          }}
          onClose={() => {
            setIsScorecardOpen?.(false)
          }}
          finalScore={finalScore}
        />
      </Modal>
      <Modal isModalOpen={!!isHelpModalOpen}>
        <HelpModal onClose={() => setIsHelpModalOpen?.(false)} />
      </Modal>
      <div className='flex flex-col w-[480px] justify-between m-auto mt-8'>
        <div className='flex justify-between items-center'>
          <div className='text-left ml-[8px]'>
            <span className='font-bold'>Moves:</span> {moveCount} <br />
            <span className='font-bold'>Time:</span> {formattedTime}
          </div>
          <div className='text-left mr-[8px]'>
            <button className='px-[12px] py-[6px] bg-blue-500 text-white rounded-[4px] cursor-default font-semibold hover:bg-blue-600 duration-200' onClick={() => {
              resetBoard?.();
            }}>New Game</button>
          </div>
        </div>
        <div className='w-full h-full'>
          {
            boardData?.map((rowData, index) => 
            <TileRow rowData={rowData} key={`tile-row-${index}`} />
            )
          }
        </div>
      </div>
      <div className='text-gray-600 mt-4'>Made with ❤️ and&nbsp;
        <a href="https://react.dev/" className='text-blue-600 hover:underline cursor-default' target="_blank">React</a> by&nbsp;
        <a href="https://animeshkumar.me/" className='text-blue-600 hover:underline cursor-default'>Animesh</a>
      </div>
    </>
  )
}

function TileRow({
  rowData
}: {
  rowData: TileData[]
}) {
  return (
    <div className='flex'>
    {
      rowData.map((tileData, index) => 
        <TileComponent tileData={tileData} key={`tile-component-${index}`} />
      )
    }
    </div>
  )
}

export default MemoryMatchingGame;