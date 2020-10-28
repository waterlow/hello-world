import React, { useCallback, useState } from 'react'
import './board.css'
import Square from './square'

const calculateWinner = (squares: number[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const line = lines.find(([a, b, c]) => (
    squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
  ));
  return line && squares[line[0]]
}

const Board: React.FC = () => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setIsNext] = useState(true)
  const renderSquare = useCallback((i) => {
    const handleClick = (i: number) => {
      if (calculateWinner(squares) || squares[i]) return

      const newSquares = [...squares]
      newSquares[i] = xIsNext ? 'X' : 'O'
      setSquares(newSquares)
      setIsNext(!xIsNext)
    }

    const value = squares[i]
    return <Square value={value} onClick={() => handleClick(i)}/>
  }, [squares, xIsNext])

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      <div className="status">{status}</div>
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
