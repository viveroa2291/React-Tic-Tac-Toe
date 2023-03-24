import { useState } from "react";
function Board({ xIsNext, squares, onPlay }) {

  const [count, setCount] = useState(0);
  /*
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
*/
  const winner = calculateWinner(squares);
  
  let status;
  if(winner) {
    status = "Winner: " + winner;
  }  else if (!winner & count === 9) {
      status = "No winner";
  }
  else {
      status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    setCount(count+1); // Updates the count everytime it is clicked
    if(squares[i] || calculateWinner(squares)) {
      return;  // Checks if the square is already filled. It returns what it already has so it doesn't update. Or if there's a winner already.
    }
    const nextSquares = squares.slice(); //  create a copy of the squares array instead of modifying the existing array.
    if(xIsNext) {
      nextSquares[i] = "X";
    }
    else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  return (
    // you can use fragments (<> and </>) to wrap multiple adjacent JSX elements like this
    <>
    <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={ () => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={ () => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={ () => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={ () => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={ () => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={ () => handleClick(5)}/>
        
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={ () => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={ () => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={ () => handleClick(8)}/>
      </div>  
    </>
  )
}
    function Square({value, onSquareClick}) {
      /*
      const [value, setValue] = useState(null);
      function handleClick() {
        setValue('X');
      }
      */
      return (
      <button className="square" onClick={onSquareClick}> {value} </button>
        );
    }
    function calculateWinner(squares) {
      const lines = [
        [0, 1, 2], // Top Horizontal Win 
        [3, 4, 5], // Middle Horizontal Win
        [6, 7, 8], // Bottom Horizontal Win
        [0, 3, 6], // Left Vertical Win
        [1, 4, 7], // Middle Vertical Win
        [2, 5, 8], // Right Vertical Win
        [0, 4, 8], // Top Left Diagonal Bottom Right Win
        [2, 4, 6] // Top Right Diagonal Bottom Left Win
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }
export default function Game() {

  // const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
   // setXIsNext(!xIsNext);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
   // setXIsNext(nextMove % 2 === 0);
  }
  
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}