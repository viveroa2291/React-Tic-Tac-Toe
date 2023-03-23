import { useState } from "react";
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
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
    setSquares(nextSquares); // Calling the setSquares function lets React know the state of the component has changed.
    setXIsNext(!xIsNext); 
  }

  return (
    // you can use fragments (<> and </>) to wrap multiple adjacent JSX elements like this
    <>
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
