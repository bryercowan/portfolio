import React, { useState, useEffect, useCallback } from 'react';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const EMPTY_CELL = '⬛';
const FILLED_CELL = '⬜';

const TETROMINOS = {
  I: { shape: [[1, 1, 1, 1]], color: '🟦' },
  O: { shape: [[1, 1], [1, 1]], color: '🟨' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '🟪' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '🟩' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '🟥' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: '🟦' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: '🟧' }
};

interface GameState {
  board: string[][];
  currentPiece: {
    shape: number[][];
    color: string;
    x: number;
    y: number;
  } | null;
  score: number;
  gameOver: boolean;
  paused: boolean;
}

const initialGameState: GameState = {
  board: Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(EMPTY_CELL)),
  currentPiece: null,
  score: 0,
  gameOver: false,
  paused: false
};

export function TetrisGame({ onGameOver }: { onGameOver: (score: number) => void }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const createNewPiece = useCallback(() => {
    const pieces = Object.keys(TETROMINOS);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)] as keyof typeof TETROMINOS;
    const tetromino = TETROMINOS[randomPiece];
    
    return {
      shape: tetromino.shape,
      color: tetromino.color,
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(tetromino.shape[0].length / 2),
      y: 0
    };
  }, []);

  const checkCollision = useCallback((piece: GameState['currentPiece'], board: string[][], offsetX = 0, offsetY = 0) => {
    if (!piece) return true;
    
    return piece.shape.some((row, y) =>
      row.some((cell, x) => {
        const newX = piece.x + x + offsetX;
        const newY = piece.y + y + offsetY;
        return (
          cell &&
          (newX < 0 ||
            newX >= BOARD_WIDTH ||
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && board[newY][newX] !== EMPTY_CELL))
        );
      })
    );
  }, []);

  const mergePieceToBoard = useCallback((piece: GameState['currentPiece'], board: string[][]) => {
    if (!piece) return board;
    
    const newBoard = board.map(row => [...row]);
    piece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell && piece.y + y >= 0) {
          newBoard[piece.y + y][piece.x + x] = piece.color;
        }
      });
    });
    
    return newBoard;
  }, []);

  const clearLines = useCallback((board: string[][]) => {
    let linesCleared = 0;
    const newBoard = board.filter(row => {
      const isLineFull = row.every(cell => cell !== EMPTY_CELL);
      if (isLineFull) linesCleared++;
      return !isLineFull;
    });
    
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(EMPTY_CELL));
    }
    
    return { newBoard, linesCleared };
  }, []);

  const moveDown = useCallback(() => {
    setGameState(prev => {
      if (prev.gameOver || prev.paused || !prev.currentPiece) return prev;

      if (checkCollision(prev.currentPiece, prev.board, 0, 1)) {
        const newBoard = mergePieceToBoard(prev.currentPiece, prev.board);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        
        const nextPiece = createNewPiece();
        if (checkCollision(nextPiece, clearedBoard)) {
          onGameOver(prev.score + linesCleared * 100);
          return { ...prev, board: clearedBoard, gameOver: true };
        }
        
        return {
          ...prev,
          board: clearedBoard,
          currentPiece: nextPiece,
          score: prev.score + linesCleared * 100
        };
      }

      return {
        ...prev,
        currentPiece: {
          ...prev.currentPiece,
          y: prev.currentPiece.y + 1
        }
      };
    });
  }, [checkCollision, clearLines, createNewPiece, mergePieceToBoard, onGameOver]);

  const move = useCallback((direction: number) => {
    setGameState(prev => {
      if (prev.gameOver || prev.paused || !prev.currentPiece) return prev;
      
      if (!checkCollision(prev.currentPiece, prev.board, direction, 0)) {
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            x: prev.currentPiece.x + direction
          }
        };
      }
      return prev;
    });
  }, [checkCollision]);

  const rotate = useCallback(() => {
    setGameState(prev => {
      if (prev.gameOver || prev.paused || !prev.currentPiece) return prev;
      
      const rotated = {
        ...prev.currentPiece,
        shape: prev.currentPiece.shape[0].map((_, i) =>
          prev.currentPiece.shape.map(row => row[i]).reverse()
        )
      };
      
      if (!checkCollision(rotated, prev.board)) {
        return { ...prev, currentPiece: rotated };
      }
      return prev;
    });
  }, [checkCollision]);

  useEffect(() => {
    if (!gameState.currentPiece && !gameState.gameOver) {
      const piece = createNewPiece();
      if (!checkCollision(piece, gameState.board)) {
        setGameState(prev => ({ ...prev, currentPiece: piece }));
      }
    }
  }, [gameState.currentPiece, gameState.gameOver, createNewPiece, checkCollision, gameState.board]);

  useEffect(() => {
    const interval = setInterval(moveDown, 1000);
    return () => clearInterval(interval);
  }, [moveDown]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState.gameOver) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          move(-1);
          break;
        case 'ArrowRight':
          move(1);
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
          rotate();
          break;
        case ' ':
          setGameState(prev => ({ ...prev, paused: !prev.paused }));
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameOver, move, moveDown, rotate]);

  const renderBoard = useCallback(() => {
    const displayBoard = gameState.board.map(row => [...row]);
    
    if (gameState.currentPiece && !gameState.paused) {
      gameState.currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (
            cell &&
            gameState.currentPiece!.y + y >= 0 &&
            gameState.currentPiece!.y + y < BOARD_HEIGHT &&
            gameState.currentPiece!.x + x >= 0 &&
            gameState.currentPiece!.x + x < BOARD_WIDTH
          ) {
            displayBoard[gameState.currentPiece!.y + y][gameState.currentPiece!.x + x] =
              gameState.currentPiece!.color;
          }
        });
      });
    }
    
    return displayBoard;
  }, [gameState.board, gameState.currentPiece, gameState.paused]);

  const displayBoard = renderBoard();

  return (
    <div className="tetris-game">
      <div className="game-info">
        <div>Score: {gameState.score}</div>
        {gameState.paused && <div>PAUSED</div>}
        {gameState.gameOver && <div>GAME OVER</div>}
      </div>
      <div className="game-board">
        {displayBoard.map((row, i) => (
          <div key={i} className="board-row">
            {row.map((cell, j) => (
              <span key={j}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
      <div className="game-controls">
        <div>Controls:</div>
        <div>↑ Rotate</div>
        <div>← → Move</div>
        <div>↓ Drop</div>
        <div>Space Pause</div>
      </div>
    </div>
  );
}