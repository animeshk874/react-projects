import React, { useContext, useMemo, useState } from 'react';
import './TileComponent.css';
import cn from 'classnames';
import { TileData } from '../../../models/tile';
import { Icon, iconsMapping } from '../../../models/icon-mapping';
import { GameContext } from '../../GameProvider/GameProvider';

function TileComponent({
  tileData
}: {
  tileData: TileData
}) {
  const iconData: Icon = useMemo(() => iconsMapping.find(icon => icon.id === tileData.iconId) as Icon, [tileData]);
  const {
    onClick,
    firstFlippedTile,
    secondFlippedTile,
    solvedTiles
  } = useContext(GameContext);

  const isFlipped = useMemo(() => {
    return (tileData.tileId === firstFlippedTile?.tileId) || (tileData.tileId === secondFlippedTile?.tileId);
  }, [firstFlippedTile, secondFlippedTile]);

  const isSolved = useMemo(() => {
    return solvedTiles?.includes(tileData.tileId);
  }, [solvedTiles]);

  return (
    <div className={cn(
      'tile h-[104px] w-[104px] m-[8px]',
      {
        flip: isFlipped || isSolved,
        'shake-and-pop': isSolved,
      },
     )} onClick={() => {
          if(isFlipped) return;
          onClick?.(tileData);
        }}
      >
      <div className="front h-full w-full rounded-[6px]">
      </div>
      <div className="back h-full w-full rounded-[6px] p-4" dangerouslySetInnerHTML={{ __html: iconData.iconXml }} >
      </div>
    </div>
  )
}

export default React.memo(TileComponent);