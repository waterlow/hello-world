import React, { MouseEventHandler } from 'react';
import type { Square as SquareType } from './types'

const Square: React.FC<{value: SquareType, onClick: MouseEventHandler}> = ({value, onClick}) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
