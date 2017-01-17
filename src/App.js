import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Draggable from 'react-draggable';


function Square (props) {
  if (props.picture !== undefined) {
      return (
      <div className={props.color + "Square"}>
        <Piece picture={props.picture} />
      </div>
    );
  } else {
    return (
      <div className={props.color + "Square"}></div>
    );
  }
  

  
  
}

class Piece extends React.Component{
  render(){
    return (
      <Draggable
        axis="both"
        handle=".piecePicture"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[1, 1]}
        bounds=".chessBoard"
        zIndex={100}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
      <div className="piecePicture" style={{backgroundImage:"url(" + require(this.props.picture) + ")"}}/>
      </Draggable>      
    )
  }
}

// function Square(props){
//   return (
//     <div className={props.color + "Square"} onClick={() => props.onClick()}>
//       <Draggable
//         axis="x"
//         handle=".piecePicture"
//         defaultPosition={{x: 0, y: 0}}
//         position={null}
//         grid={[25, 25]}
//         zIndex={100}
//         onStart={this.handleStart}
//         onDrag={this.handleDrag}
//         onStop={this.handleStop}>
//       <img className="piecePicture" src={props.picture !== undefined ? require(props.picture) : ''} />
//       </Draggable>
//     </div>
//   )
// }

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

  handleClick(square) {
    if(square in position) {
      
    }
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
