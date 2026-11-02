import { useState } from 'react'
import Square from './Square.jsx'

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function getWinningLine(squares) {
  return (
    winningLines.find(([first, second, third]) =>
      squares[first] &&
      squares[first] === squares[second] &&
      squares[first] === squares[third],
    ) ?? null
  )
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [scores, setScores] = useState({ X: 0, O: 0 })
  const winningLine = getWinningLine(squares)
  const winner = winningLine ? squares[winningLine[0]] : null
  const isDraw = !winner && squares.every(Boolean)
  const isGameOver = Boolean(winner || isDraw)

  function handleClick(index) {
    if (squares[index] || isGameOver) return

    const nextSquares = [...squares]
    nextSquares[index] = xIsNext ? 'X' : 'O'
    const nextWinningLine = getWinningLine(nextSquares)

    if (nextWinningLine) {
      const roundWinner = nextSquares[nextWinningLine[0]]
      setScores((currentScores) => ({
        ...currentScores,
        [roundWinner]: currentScores[roundWinner] + 1,
      }))
    }

    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  function handleRestart() {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  let status = `Következik: ${xIsNext ? 'X' : 'O'}`
  if (winner) status = `A győztes: ${winner}!`
  else if (isDraw) status = 'Döntetlen!'

  return (
    <main className="game">
      <header className="game-header">
        <p className={`game-status${isGameOver ? ' game-status--finished' : ''}`} aria-live="polite">
          {status}
        </p>
      </header>

      <div className="scoreboard" aria-label="Győzelmek száma">
        <span>X győzelmei: {scores.X}</span>
        <span>O győzelmei: {scores.O}</span>
      </div>

      <div className="board" role="grid" aria-label="Amőba játéktábla">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onSquareClick={() => handleClick(index)}
          />
        ))}
        {winningLine && (
          <svg
            className="winning-line"
            viewBox="0 0 300 300"
            aria-hidden="true"
          >
            <line
              x1={(winningLine[0] % 3) * 100 + 50}
              y1={Math.floor(winningLine[0] / 3) * 100 + 50}
              x2={(winningLine[2] % 3) * 100 + 50}
              y2={Math.floor(winningLine[2] / 3) * 100 + 50}
            />
          </svg>
        )}
      </div>

      <button className="restart-button" type="button" onClick={handleRestart}>
        Új játék
      </button>
    </main>
  )
}

export default Board
