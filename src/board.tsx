import React from 'react'
import './board.css'
import Square from './square'
import type { Squares } from './types'

const Board: React.FC<{ squares: Squares, onClick: (i: number) => void }> = ({squares, onClick}) => {
  const renderSquare = (i: number) => (
    <Square
      value={squares[i]}
      onClick={() => onClick(i)}/>
  )

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

export default Board
