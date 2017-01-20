import React, { Component } from 'react';
import './App.css';
import Draggable from 'react-draggable';
import Chess from 'chess.js';
import Board from './chessBoard.js'
import MovesList from './movesList.js'

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
        c2: 'wPawn',
        d2: 'wPawn',
        e2: 'wPawn',
        f2: 'wPawn',
        g2: 'wPawn',
        h2: 'wPawn',
        a8: 'bRook',
        b8: 'bKnight',
        c8: 'bBishop',
        d8: 'bQueen',
        e8: 'bKing',
        f8: 'bBishop',
        g8: 'bKnight',
        h8: 'bRook',
        a7: 'bPawn',
        b7: 'bPawn',
        c7: 'bPawn',
        d7: 'bPawn',
        e7: 'bPawn',
        f7: 'bPawn',
        g7: 'bPawn',
        h7: 'bPawn',
        
      },
      whiteIsNext: true,
      history: [],
      moveNumber: 0,
    };

    this.chess = new Chess();
    
    this.startSquare = '';
  }

  updatePosition(startSquare, targetSquare){
    
    var position = Object.assign({}, this.state.position);
    var pieceToMove = position[startSquare];
    position[startSquare] = undefined;
    position[targetSquare] = pieceToMove;
    return position;
  }

  onMouseDown(startSquare){
    console.log(startSquare);
    this.setState({availableMoves: this.chess.moves({square: startSquare})})
    
    this.startSquare = startSquare;
  }

  onMouseUp(endSquare) {
    console.log(endSquare);
    var newPosition = this.updatePosition(this.startSquare, endSquare);
    this.setState({
      position: newPosition,
      history: this.state.history.concat({
        endSquare: endSquare, 
        position: newPosition
      }),
      whiteIsNext: !this.state.whiteIsNext,
    });
    this.chess.move({from: this.startSquare, to: endSquare});
  }

  jumpTo(move) {
    console.log(move);
    this.setState({
      position: this.state.history[move]['position'],
    })
  }

  render() {
    return (
      <div className="chessBoard">
        <Board position={this.state.position} whiteIsNext={this.state.whiteIsNext} onClick={this.onMouseDown.bind(this)} availableMoves={this.state.availableMoves} onMouseUp={this.onMouseUp.bind(this)}/>
        <MovesList history={this.state.history} onClick={this.jumpTo.bind(this)}/>
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
