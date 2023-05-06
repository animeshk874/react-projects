import React, { useMemo } from 'react';
import { getMemoryMatchFinalMessage } from '../../../utils/memory-match.utils';
import './ScoreCardModal.css';

interface ScoreCardModalProps {
  moves: number;
  formattedTime: string;
  onNewGame: () => void;
  onClose: () => void;
  finalScore?: number;
}

function ScoreCardModal({
  moves,
  formattedTime,
  onNewGame,
  onClose,
  finalScore = 0,
}: ScoreCardModalProps) {
  const finalMessage = useMemo(() => getMemoryMatchFinalMessage(finalScore), [finalScore]);
  return (
    <div className="p-2 w-[500px] m-4 max-w-[95%]">
    <div className="px-4 pt-4 pb-0">
      <div className="w-full d-flex justify-content-center">
        <div className="modal-image w-[240px] m-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="wall-e" viewBox="0 0 64 64">
            <defs>
            </defs>
            <title>Walle-female</title>
            <g id="Walle-female">
              <path className="cls-1"
                d="M49.72,16.17C49.72,9,41.79,1,32,1S14.28,9,14.28,16.17,22.21,27,32,27,49.72,23.35,49.72,16.17Z" />
              <path className="cls-2"
                d="M45,15.34c0-4.45-5.82-9.41-13-9.41s-13,5-13,9.41,5.82,6.73,13,6.73S45,19.8,45,15.34Z" />
              <path className="cls-1" d="M50,39C50,23,41.94,31,32,31S14,23,14,39s8.06,24,18,24S50,55,50,39Z" />
              <path className="cls-3"
                d="M32,54c-8.92,0-16.3-6.45-17.73-19.34A30.91,30.91,0,0,0,14,39c0,16,8.06,24,18,24s18-8,18-24a30.91,30.91,0,0,0-.27-4.32C48.3,47.55,40.92,54,32,54Z" />
              <circle className="cls-4" cx="25" cy="38" r="2" />
              <path className="cls-1" d="M18,39c0-7.73-1.34-10-3-10s-3-.73-3,7,1.34,21,3,21S18,46.73,18,39Z" />
              <path className="cls-1" d="M46,39c0-7.73,1.34-10,3-10s3-.73,3,7-1.34,21-3,21S46,46.73,46,39Z" />
              <ellipse className="cls-5" cx="37" cy="15" rx="3.7" ry="2.47"
                transform="translate(-2.89 16.55) rotate(-24.3)" />
              <ellipse className="cls-5" cx="27" cy="15" rx="2.47" ry="3.7"
                transform="translate(2.22 33.44) rotate(-65.7)" />
            </g>
          </svg>
        </div>
      </div>
      <div className="mt-4 p-2 font-weight-light text-left">
        <p>Congratulations! You solved the puzzle!</p>
        <p className='font-semibold'>Moves: <span className='font-normal'>{moves}</span></p>
        <p className='font-semibold'>Time: <span className='font-normal'>{formattedTime} minutes</span></p>
        <p className='mt-4 font-semibold text-lg'>Final Score: <span className='font-normal'>{finalScore}</span></p>
        <p className='mt-4 text-lg font-semibold'>
          {finalMessage}
        </p>
        <div className="modal-button mt-3 text-center">
          <button className="cursor-default m-2 px-[12px] py-[6px] bg-blue-500 text-white rounded-[4px] cursor-default font-semibold hover:bg-blue-600 duration-200" onClick={onNewGame}>Play Again</button>
          <button className="cursor-default m-2 px-[12px] py-[6px] bg-white text-blue-500 rounded-[4px] cursor-default font-semibold hover:bg-gray-100 duration-200" onClick={onClose}>Nah, I am done!</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default React.memo(ScoreCardModal);