import React, { useState } from 'react';


import './App.css';

export default function Square() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [history,setHistory] = useState([]);
  const setValue = (i) => {
    const nextSquares = squares.slice();
    if(nextSquares[i] != null)return;
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setXIsNext(!xIsNext);

    setSquares(nextSquares);
    addHistory(nextSquares);
    let winData = winner(nextSquares);
    if(winData != null)  {
      const conf = window.confirm('Winner: "' + winData + '". New game?')
      setHistory([]);
      if(conf){
        setSquares(Array(9).fill(null))
      }
    }


  }
  const addHistory = (squares)=>{
    let newHistory = history;
    newHistory.push(squares);
    setHistory(newHistory)
  }
  const winner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const  setHistorySquares =(index) => {
    setSquares(history[index])
    let newHistory = history;
    newHistory.splice(index,newHistory.length-1-index)
    console.log('history',newHistory)
    console.log('square',squares)
    setHistory(newHistory)
  }
  return <>

    <div className="board-row">
      {
        squares.map((square, i) => {
          return <Button value={square} onSquareClick={() => setValue(i)} />

        })
      }

    </div>

    <div>
      <ul>
        {
          history.map((value ,index)=>{
            return <li><button onClick={()=>setHistorySquares(index)}>{index+1}. hamle</button></li>
          })
        }

      </ul>
    </div>


  </>
}
const Button = ({value,onSquareClick})=>{
  return <button className="square" onClick={onSquareClick}>{value}</button>
}