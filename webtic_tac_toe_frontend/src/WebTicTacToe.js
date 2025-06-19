import React, { useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main container component for WebTicTacToe-5063.
 * Implements a responsive, real-time (placeholder), two-player TicTacToe game.
 */
function WebTicTacToe() {
  const emptyBoard = Array(3).fill(null).map(() => Array(3).fill(null));
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X'); // X always starts
  const [winner, setWinner] = useState(null);
  const [moveCount, setMoveCount] = useState(0);

  // PUBLIC_INTERFACE
  /** Handles a player move at (row, col). */
  function handleCellClick(row, col) {
    if (board[row][col] || winner) return; // No move if cell filled or game over

    const newBoard = board.map(r => r.slice());
    newBoard[row][col] = currentPlayer;

    setBoard(newBoard);
    setMoveCount(moveCount + 1);

    const foundWinner = calculateWinner(newBoard);
    if (foundWinner) {
      setWinner(foundWinner);
    } else if (moveCount + 1 === 9) {
      setWinner('draw'); // All filled, draw game
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  }

  // PUBLIC_INTERFACE
  /** Resets the game state for a new game. */
  function resetGame() {
    setBoard(emptyBoard);
    setCurrentPlayer('X');
    setWinner(null);
    setMoveCount(0);
  }

  // PUBLIC_INTERFACE
  /** Calculates the winner given a board state. */
  function calculateWinner(b) {
    // Rows, columns, diagonals
    for (let i = 0; i < 3; ++i) {
      if (b[i][0] && b[i][0] === b[i][1] && b[i][1] === b[i][2]) return b[i][0];
      if (b[0][i] && b[0][i] === b[1][i] && b[1][i] === b[2][i]) return b[0][i];
    }
    if (b[0][0] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) return b[0][0];
    if (b[0][2] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) return b[0][2];
    return null;
  }

  // This section would later be replaced with real-time integration (websockets, etc.)
  // For now, all state updates are instant and local.

  return (
    <div className="tic-tac-toe-container" style={{
      minHeight: '100vh',
      background: 'var(--base-dark)',
      color: 'var(--text-color)',
      fontFamily: 'inherit',
      paddingTop: '88px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <header style={{ marginBottom: 24, width: '100%' }}>
        <h2 style={{
          textAlign: 'center', 
          color: 'var(--base-light)',
          fontWeight: 700,
          fontSize: '2.2rem',
          margin: 0
        }}>
          WebTicTacToe
        </h2>
        <div style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '1.08rem',
          margin: 0
        }}>
          Enjoy a simple, real-time TicTacToe Game for Two
        </div>
      </header>
      <div 
        className="game-board"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: 6,
          width: 'min(300px, 90vw)',
          aspectRatio: '1',
          background: '#0f111a',
          borderRadius: '14px',
          boxShadow: '0 6px 24px 0 #00000040',
          marginBottom: 24
        }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <button
              key={i * 3 + j}
              className="ttt-cell"
              aria-label={`TicTacToe cell ${i + 1},${j + 1}`}
              onClick={() => handleCellClick(i, j)}
              style={{
                background: '#181c28',
                color: cell === 'X' ? '#ffd900' : cell === 'O' ? '#ff7575' : 'var(--text-color)',
                fontSize: '2.6rem',
                fontWeight: 600,
                border: '2px solid var(--border-color)',
                borderRadius: '3px',
                cursor: (cell || winner) ? 'not-allowed' : 'pointer',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 'calc(min(300px, 90vw)/3 - 6px)',
                width: '100%',
                transition: 'background 0.15s'
              }}
              disabled={!!cell || !!winner}
            >
              {cell}
            </button>
          ))
        )}
      </div>
      <div className="game-info" style={{
        marginBottom: 16,
        textAlign: 'center',
        minHeight: '1.2rem'
      }}>
        {!winner && (
          <span>
            <span style={{ color: currentPlayer === 'X' ? '#ffd900' : '#ff7575', fontWeight: 500 }}>
              Player {currentPlayer}
            </span>
            {"'s turn"}
          </span>
        )}
        {winner && (
          <span>
            {winner === 'draw' ? (
              <span style={{ color: 'var(--base-light)' }}>It's a draw!</span>
            ) : (
              <span>
                <span style={{ color: winner === 'X' ? '#ffd900' : '#ff7575', fontWeight: 700 }}>
                  Player {winner}
                </span>
                {' wins!'}
              </span>
            )}
          </span>
        )}
      </div>
      <button
        className="btn btn-large"
        style={{
          width: 140,
          margin: '0 auto',
          display: 'block',
          background: 'var(--base-light)',
          color: 'black'
        }}
        onClick={resetGame}
        aria-label="Reset game"
      >
        Reset Game
      </button>
      <div style={{
        marginTop: '44px',
        fontSize: '0.88rem',
        color: 'var(--text-secondary)',
        textAlign: 'center'
      }}>
        {/* Placeholder for future: Room code, realtime status, sharing, etc. */}
        Powered by KAVIA | React
      </div>
    </div>
  );
}

export default WebTicTacToe;
