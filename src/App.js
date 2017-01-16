import React, { Component } from 'react';
//import Image from 'react-native';
import logo from './logo.svg';
//import rook from './bRook.png'
import './App.css';

function Square(props){
  return (
    <div className={props.color + "Square"} onClick={() => props.onClick()}>
      <img src={props.picture !== undefined ? require(props.picture) : ''} />
    </div>
  )
}

class Board extends Component {

  renderSquare(piece, color){
    const piecesPictures = {
      'bRook': './static/bRook.png',
      'bKnight': './static/bKnight.png'
    }
    return <Square picture={piecesPictures[piece]} color={color}/>
  }

  render() {
    return (
  <div>
    <div className="board-row8">{this.renderSquare(this.props.position['a8'], 'white')}{this.renderSquare(this.props.position['b8'], 'black')}{this.renderSquare(3, 'white')}{this.renderSquare(4, 'black')}{this.renderSquare(5, 'white')}{this.renderSquare(6, 'black')}{this.renderSquare(7, 'white')}{this.renderSquare(8, 'black')}
    </div>
    <div className="board-row7">{this.renderSquare(1, 'black')}{this.renderSquare(2, 'white')}{this.renderSquare(3, 'black')}{this.renderSquare(4, 'white')}{this.renderSquare(5, 'black')}{this.renderSquare(6, 'white')}{this.renderSquare(7, 'black')}{this.renderSquare(8, 'white')}
    </div>
    <div className="board-row6">{this.renderSquare(1, 'white')}{this.renderSquare(2, 'black')}{this.renderSquare(3, 'white')}{this.renderSquare(4, 'black')}{this.renderSquare(5, 'white')}{this.renderSquare(6, 'black')}{this.renderSquare(7, 'white')}{this.renderSquare(8, 'black')}
    </div>
    <div className="board-row5">{this.renderSquare(1, 'black')}{this.renderSquare(2, 'white')}{this.renderSquare(3, 'black')}{this.renderSquare(4, 'white')}{this.renderSquare(5, 'black')}{this.renderSquare(6, 'white')}{this.renderSquare(7, 'black')}{this.renderSquare(8, 'white')}
    </div>
    <div className="board-row4">{this.renderSquare(1, 'white')}{this.renderSquare(2, 'black')}{this.renderSquare(3, 'white')}{this.renderSquare(4, 'black')}{this.renderSquare(5, 'white')}{this.renderSquare(6, 'black')}{this.renderSquare(7, 'white')}{this.renderSquare(8, 'black')}
    </div>
    <div className="board-row3">{this.renderSquare(1, 'black')}{this.renderSquare(2, 'white')}{this.renderSquare(3, 'black')}{this.renderSquare(4, 'white')}{this.renderSquare(5, 'black')}{this.renderSquare(6, 'white')}{this.renderSquare(7, 'black')}{this.renderSquare(8, 'white')}
    </div>
    <div className="board-row2">{this.renderSquare(1, 'white')}{this.renderSquare(2, 'black')}{this.renderSquare(3, 'white')}{this.renderSquare(4, 'black')}{this.renderSquare(5, 'white')}{this.renderSquare(6, 'black')}{this.renderSquare(7, 'white')}{this.renderSquare(8, 'black')}
    </div>
    <div className="board-row1">{this.renderSquare(1, 'black')}{this.renderSquare(2, 'white')}{this.renderSquare(3, 'black')}{this.renderSquare(4, 'white')}{this.renderSquare(5, 'black')}{this.renderSquare(6, 'white')}{this.renderSquare(7, 'black')}{this.renderSquare(8, 'white')}
    </div>
  </div>
    )
  }
}

class Game extends Component {
  constructor() {
    super();
    this.state = {
      position: {
        a1: 'wRook',
        b1: 'wKnight',
        c1: 'wBishop',
        d1: 'wQueen',
        e1: 'wKing',
        f1: 'wBishop',
        g1: 'wKnight',
        h1: 'wRook',
        a2: 'wPawn',
        b2: 'wPawn',
        a8: 'bRook',
        b8: 'bKnight',
      },
      whiteIsNext: true,
    };
  }

  render() {
    return (
      <div className="chessBoard">
        <Board position={this.state.position} />
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="gameContainer">
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
