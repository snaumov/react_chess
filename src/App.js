import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Draggable from 'react-draggable';
import { CalculateTargetSquare } from './helpers.js'

class Piece extends React.Component{
  constructor() {
    super();
    this.state = {
      controlledPosition: {x: 0, y:0},
    };

  }

  // onControlledDrag(e, position) {
  //   const {x, y} = position;
  //   this.setState({controlledPosition: {x, y}});
  //   console.log(this.state)
  // }

  onControlledDragStop(e, position) {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
    this.props.onClick(this.props.coordinate, CalculateTargetSquare(this.props.coordinate, this.state.controlledPosition['x'], this.state.controlledPosition['y']));
  }

  render(){
    return (
      <Draggable
        axis="both"
        handle=".piecePicture"
        defaultPosition={{x: 0, y: 0}}
        position={this.state.controlledPosition}
        grid={[1, 1]}
        bounds=".chessBoard"
        zIndex={100}
        onStart={this.handleStart}    //{this.onControlledStart.bind(this)}
        onDrag={this.handleDrag}   //{this.onControlledDrag.bind(this)}
        onStop={this.onControlledDragStop.bind(this)}>
      <div className="piecePicture" style={{backgroundImage:"url(" + require(this.props.picture) + ")"}}/>
      </Draggable>      
    )
  }
}

function Square (props) {
  if (props.picture !== undefined) {
      return (
      <div className={props.color + "Square"}>
        <Piece coordinate={props.coordinate} picture={props.picture} onClick={props.onClick}/>
      </div>
    );
  } else {
    return (
      <div className={props.color + "Square"}></div>
    );
  }
    
}

class Board extends Component {

  renderSquare(piece, color, coordinate){
    if (coordinate === undefined){  //to delete
      coordinate = 'a1'
    }
    const piecesPictures = {
      'bRook': './static/bRook.png',
      'bKnight': './static/bKnight.png',
      'wRook': './static/wRook.png',
    }
    return <Square coordinate={coordinate} picture={piecesPictures[piece]} color={color} onClick={this.props.onClick}/>
  }

  clickHandler(value){
    if(value > 140){}
    console.log("im here", value);
  }

  render() {
    return (
  <div>
    <div className="board-row8">{this.renderSquare(this.props.position['a8'], 'white', 'a8')}{this.renderSquare(this.props.position['b8'], 'black', 'b8')}{this.renderSquare(3, 'white', 'c8')}{this.renderSquare(4, 'black')}{this.renderSquare(5, 'white')}{this.renderSquare(6, 'black')}{this.renderSquare(7, 'white')}{this.renderSquare(8, 'black')}
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
    <div className="board-row1">{this.renderSquare(this.props.position['a1'], 'black', 'a1')}{this.renderSquare(2, 'white')}{this.renderSquare(3, 'black')}{this.renderSquare(4, 'white')}{this.renderSquare(5, 'black')}{this.renderSquare(6, 'white')}{this.renderSquare(7, 'black')}{this.renderSquare(8, 'white')}
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

  clickHandler(startPosition, endPosition) {
    console.log(startPosition, endPosition);
  }

  render() {
    return (
      <div className="chessBoard">
        <Board position={this.state.position} onClick={this.clickHandler}/>
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
