import React, { MouseEventHandler } from 'react';

const Square: React.FC<{value: number, onClick: MouseEventHandler}> = ({value, onClick}) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
