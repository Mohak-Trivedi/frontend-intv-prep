import { useState } from 'react';
import './App.css';

const CELLS_IN_A_LINE = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function determineWinner(board) {
  for (let i = 0; i < CELLS_IN_A_LINE.length; i++) {
    const [x, y, z] = CELLS_IN_A_LINE[i];
    if (board[x] !== null && board[y] === board[x] && board[z] === board[y]) {
      return board[x];
    }
  }

  // No winner yet
  return null;
}

function Cell({ index, turn, mark, onClick, disabled }) {
  return (
    <button className="cell" onClick={onClick} disabled={disabled}
    aria-label={`Mark cell ${index} as ${turn}`}>
      <span aria-hidden={true}>{ mark }</span>
    </button>
  );
}

function App() {
  const [isXPlaying, setIsXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));

  const winner = determineWinner(board);

  function onReset() {
    setBoard(Array(9).fill(null));
    setIsXPlaying(true);
  }

  function getStatusMessage() {
    // Winner found
    if (winner != null) {
      return `Player ${winner} wins!`;
    }

    // Draw: All cells filled up
    if (!board.includes(null)) {
      return "It's a draw!";
    }

    // Next Player
    return `Player ${isXPlaying ? 'X' : 'O'} turn`;
  }

  return (
    <div className="app">
      <div aria-live="polite">{getStatusMessage()}</div>
      <div className="board">
        {Array(9).fill(null).map((_, cellIndex) => {
          const turn = isXPlaying ? 'X' : 'O';
          return (<Cell key={cellIndex}
            index={cellIndex}
            turn={turn}
            mark={board[cellIndex]}
            disabled={board[cellIndex] != null || winner != null}
            onClick={() => {
              const newBoard = board.slice();
              newBoard[cellIndex] = turn;
              setBoard(newBoard);
              setIsXPlaying(!isXPlaying);
            }}
          />);
        })}
      </div>
      <button onClick={() => {
        if (winner == null) {
          const confirm = window.confirm('Are you sure you want to reset the game?');
          if (!confirm) {
            return;
          }
        }

        onReset();
      }}>Reset</button>
    </div>
  );
}

export default App;
