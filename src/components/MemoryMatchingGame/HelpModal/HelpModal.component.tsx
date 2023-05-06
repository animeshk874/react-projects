import { MEMORY_MATCH_SCORES, TIME_FOR_NEGATIVE_SCORE } from "../../../models/constants";

interface HelpModalProps {
  onClose: () => void;
}

export default function HelpModal({
  onClose
}: HelpModalProps) {
  return (
    <div className="p-4 w-[500px] max-w-[95%]">
      <p className="mb-6 text-gray-700 font-regular">This game challenges your memory skills and concentration. Flip the cards to reveal the hidden images and match them to score points. Can you remember where each card is hiding? Let's find out!</p>
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Scoring: </h2>
      <ul style={{listStyleType: 'circle'}}>
        <li className="text-gray-700"><span className="font-semibold">{MEMORY_MATCH_SCORES.SUCCESS} points</span> for each successful match</li>
        <li className="text-gray-700"><span className="font-semibold">{MEMORY_MATCH_SCORES.FAIL} point</span> for each incorrect tile flip</li>
        <li className="text-gray-700"><span className="font-semibold">{MEMORY_MATCH_SCORES.TIME} point</span> for every {TIME_FOR_NEGATIVE_SCORE} seconds taken to solve the board</li>
      </ul>
      <div className="mt-4 text-center">
        <button onClick={onClose} className="cursor-default m-2 px-[12px] py-[6px] bg-blue-500 text-white rounded-[4px] cursor-default font-semibold hover:bg-blue-600 duration-200">Understood, let's start!</button>
      </div>
    </div>
  )
}