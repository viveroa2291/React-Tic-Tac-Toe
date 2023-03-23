import { useState } from "react";
export default function Board() {
  return (
    // you can use fragments (<> and </>) to wrap multiple adjacent JSX elements like this
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
        
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>  
    </>
  )
}
    function Square() {
      const [value, setValue] = useState(null);
      function handleClick() {
        setValue('X');
      }
      return (
      <button 
        className="square" 
        onClick={handleClick}
      >
        {value}
        </button>
        );
    }
