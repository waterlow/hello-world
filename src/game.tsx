import React, { useCallback, useMemo, useState } from 'react'
import './game.css'
import Board from './board'

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
  ]
  const line = lines.find(([a, b, c]) => (
    squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
  ))
  return line && squares[line[0]]
}

const Game: React.FC = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }])
  const [stepNumber, setStepNumber] = useState(0)
  const xIsNext = (stepNumber % 2) === 0
  const currentSquares = history[history.length - 1].squares
  const winner = calculateWinner(currentSquares)

  const status = useMemo(() => {
    if (winner) {
      return 'Winner: ' + winner
    } else {
      return 'Next player: ' + (xIsNext ? 'X' : 'O')
    }
  }, [winner, xIsNext])

  const handleClick = (i: number) => {
    if (winner || currentSquares[i]) return

    const squares = currentSquares.slice()
    squares[i] = xIsNext ? 'X' : 'O'
    setStepNumber(stepNumber + 1)
    setHistory(history.concat([{ squares }]))
  }

  const jumpTo = useCallback((step: number) => {
    return () => {
      setStepNumber(step)
      setHistory(history.slice(0, step + 1))
    }
  }, [history])

  const moves = history.map((_, move) =>
    <li key={move}>
      <button onClick={jumpTo(move)}>
        {move === 0 ? 'Go to game start' : `Go to move #${move}` }
      </button>
    </li>
  )

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

export default Game
