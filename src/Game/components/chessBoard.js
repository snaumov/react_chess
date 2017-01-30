import React, { Component, PropTypes } from 'react';
import Draggable from 'react-draggable';
import { CalculateTargetSquare, CalculateTargetSquareBlackAtBottom, IsEligibleMove } from '../../Misc/helpers.js'

class Piece extends React.Component{

  // onControlledDrag(e, position) {
  //   const {x, y} = position;
  //   this.setState({controlledPosition: {x, y}});
  //   console.log(this.state)
  // }

  onControlledDragStart(e, position) {
    this.props.onClick(this.props.coordinate);
  }

  onControlledDragStop(e, position) {
    console.log(this.props.availableMoves.map((move) => {if (move.slice(-1) === '+') {return move.slice(-3, -1)} else return move.slice(-2)}));
    const {x, y} = position;
    var targetSquare = this.props.whiteAtBottom ? CalculateTargetSquare(this.props.coordinate, x, y) : CalculateTargetSquareBlackAtBottom(this.props.coordinate, x, y);
    var isEligbleMoveOutput = IsEligibleMove(this.props.availableMoves, targetSquare)
    if (isEligbleMoveOutput.isEligible) {
      this.props.onMouseUp(targetSquare, isEligbleMoveOutput.isCastling);
    }
    
  }

  PieceCanMove(){
    if(!this.props.resigned && this.props.whiteAtBottom && this.props.pieceColor === 'w'){
      return true;
    } else if (!this.props.resigned && !this.props.whiteAtBottom && this.props.pieceColor === 'b') {
      return true;
    } else {
      return false;
    }
  }

  render(){
    return (
      <Draggable
        axis="both"
        handle=".piecePicture"
        defaultPosition={{x: 0, y: 0}}
        position={{x: 0, y: 0}}
        grid={[1, 1]}
        //bounds=".chessBoard"
        zIndex={100}
        disabled={!this.PieceCanMove()}
        onStart={this.onControlledDragStart.bind(this)}
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
        <Piece coordinate={props.coordinate} picture={props.picture} onClick={props.onClick} onMouseUp={props.onMouseUp} pieceColor={props.picture[9]} whiteIsNext={props.whiteIsNext} availableMoves={props.availableMoves} whiteAtBottom={props.whiteAtBottom} resigned={props.resigned}/>
      </div>
    );
  } else {
    return (
      <div className={props.color + "Square"}></div>
    );
  }
    
}

class WhiteAtBottomBoard extends Component {
  renderSquare(piece, color, coordinate){

    const piecesPictures = this.props.piecesPictures;
    return <Square coordinate={coordinate} picture={piecesPictures[piece]} color={color} onClick={this.props.onClick} onMouseUp={this.props.onMouseUp} whiteIsNext={this.props.whiteIsNext} availableMoves={this.props.availableMoves} whiteAtBottom={true} resigned={this.props.resigned}/>
  }

  render() {
    return (
  <div>
    <div className="board-row8">{this.renderSquare(this.props.position['a8'], 'white', 'a8')}{this.renderSquare(this.props.position['b8'], 'black', 'b8')}{this.renderSquare(this.props.position['c8'], 'white', 'c8')}{this.renderSquare(this.props.position['d8'], 'black', 'd8')}{this.renderSquare(this.props.position['e8'], 'white', 'e8')}{this.renderSquare(this.props.position['f8'], 'black', 'f8')}{this.renderSquare(this.props.position['g8'], 'white', 'g8')}{this.renderSquare(this.props.position['h8'], 'black', 'h8')}
    </div>
    <div className="board-row7">{this.renderSquare(this.props.position['a7'], 'black', 'a7')}{this.renderSquare(this.props.position['b7'], 'white', 'b7')}{this.renderSquare(this.props.position['c7'], 'black', 'c7')}{this.renderSquare(this.props.position['d7'], 'white', 'd7')}{this.renderSquare(this.props.position['e7'], 'black', 'e7')}{this.renderSquare(this.props.position['f7'], 'white', 'f7')}{this.renderSquare(this.props.position['g7'], 'black', 'g7')}{this.renderSquare(this.props.position['h7'], 'white', 'h7')}
    </div>
    <div className="board-row6">{this.renderSquare(this.props.position['a6'], 'white', 'a6')}{this.renderSquare(this.props.position['b6'], 'black', 'b6')}{this.renderSquare(this.props.position['c6'], 'white', 'c6')}{this.renderSquare(this.props.position['d6'], 'black', 'd6')}{this.renderSquare(this.props.position['e6'], 'white', 'e6')}{this.renderSquare(this.props.position['f6'], 'black', 'f6')}{this.renderSquare(this.props.position['g6'], 'white', 'g6')}{this.renderSquare(this.props.position['h6'], 'black', 'h6')}
    </div>
    <div className="board-row5">{this.renderSquare(this.props.position['a5'], 'black', 'a5')}{this.renderSquare(this.props.position['b5'], 'white', 'b5')}{this.renderSquare(this.props.position['c5'], 'black', 'c5')}{this.renderSquare(this.props.position['d5'], 'white', 'd5')}{this.renderSquare(this.props.position['e5'], 'black', 'e5')}{this.renderSquare(this.props.position['f5'], 'white', 'f5')}{this.renderSquare(this.props.position['g5'], 'black', 'g5')}{this.renderSquare(this.props.position['h5'], 'white', 'h5')}
    </div>
    <div className="board-row4">{this.renderSquare(this.props.position['a4'], 'white', 'a4')}{this.renderSquare(this.props.position['b4'], 'black', 'b4')}{this.renderSquare(this.props.position['c4'], 'white', 'c4')}{this.renderSquare(this.props.position['d4'], 'black', 'd4')}{this.renderSquare(this.props.position['e4'], 'white', 'e4')}{this.renderSquare(this.props.position['f4'], 'black', 'f4')}{this.renderSquare(this.props.position['g4'], 'white', 'g4')}{this.renderSquare(this.props.position['h4'], 'black', 'h4')}
    </div>
    <div className="board-row3">{this.renderSquare(this.props.position['a3'], 'black', 'a3')}{this.renderSquare(this.props.position['b3'], 'white', 'b3')}{this.renderSquare(this.props.position['c3'], 'black', 'c3')}{this.renderSquare(this.props.position['d3'], 'white', 'd3')}{this.renderSquare(this.props.position['e3'], 'black', 'e3')}{this.renderSquare(this.props.position['f3'], 'white', 'f3')}{this.renderSquare(this.props.position['g3'], 'black', 'g3')}{this.renderSquare(this.props.position['h3'], 'white', 'h3')}
    </div>
    <div className="board-row2">{this.renderSquare(this.props.position['a2'], 'white', 'a2')}{this.renderSquare(this.props.position['b2'], 'black', 'b2')}{this.renderSquare(this.props.position['c2'], 'white', 'c2')}{this.renderSquare(this.props.position['d2'], 'black', 'd2')}{this.renderSquare(this.props.position['e2'], 'white', 'e2')}{this.renderSquare(this.props.position['f2'], 'black', 'f2')}{this.renderSquare(this.props.position['g2'], 'white', 'g2')}{this.renderSquare(this.props.position['h2'], 'black', 'h2')}
    </div>
    <div className="board-row1">{this.renderSquare(this.props.position['a1'], 'black', 'a1')}{this.renderSquare(this.props.position['b1'], 'white', 'b1')}{this.renderSquare(this.props.position['c1'], 'black', 'c1')}{this.renderSquare(this.props.position['d1'], 'white', 'd1')}{this.renderSquare(this.props.position['e1'], 'black', 'e1')}{this.renderSquare(this.props.position['f1'], 'white', 'f1')}{this.renderSquare(this.props.position['g1'], 'black', 'g1')}{this.renderSquare(this.props.position['h1'], 'white', 'h1')}
    </div>
  </div>
    )
  }


}

class BlackAtBottomBoard extends Component {
  renderSquare(piece, color, coordinate){
    const piecesPictures = this.props.piecesPictures;
    return <Square coordinate={coordinate} picture={piecesPictures[piece]} color={color} onClick={this.props.onClick} onMouseUp={this.props.onMouseUp} whiteIsNext={this.props.whiteIsNext} availableMoves={this.props.availableMoves} whiteAtBottom={false} resigned={this.props.resigned}/>
  }

  render() {
    return (
  <div>
    <div className="board-row1">{this.renderSquare(this.props.position['h1'], 'white', 'h1')}{this.renderSquare(this.props.position['g1'], 'black', 'g1')}{this.renderSquare(this.props.position['f1'], 'white', 'f1')}{this.renderSquare(this.props.position['e1'], 'black', 'e1')}{this.renderSquare(this.props.position['d1'], 'white', 'd1')}{this.renderSquare(this.props.position['c1'], 'black', 'c1')}{this.renderSquare(this.props.position['b1'], 'white', 'b1')}{this.renderSquare(this.props.position['a1'], 'black', 'a1')}
    </div>
    <div className="board-row2">{this.renderSquare(this.props.position['h2'], 'black', 'h2')}{this.renderSquare(this.props.position['g2'], 'white', 'g2')}{this.renderSquare(this.props.position['f2'], 'black', 'f2')}{this.renderSquare(this.props.position['e2'], 'white', 'e2')}{this.renderSquare(this.props.position['d2'], 'black', 'd2')}{this.renderSquare(this.props.position['c2'], 'white', 'c2')}{this.renderSquare(this.props.position['b2'], 'black', 'b2')}{this.renderSquare(this.props.position['a2'], 'white', 'a2')}
    </div>
    <div className="board-row3">{this.renderSquare(this.props.position['h3'], 'white', 'h3')}{this.renderSquare(this.props.position['g3'], 'black', 'g3')}{this.renderSquare(this.props.position['f3'], 'white', 'f3')}{this.renderSquare(this.props.position['e3'], 'black', 'e3')}{this.renderSquare(this.props.position['d3'], 'white', 'd3')}{this.renderSquare(this.props.position['c3'], 'black', 'c3')}{this.renderSquare(this.props.position['b3'], 'white', 'b3')}{this.renderSquare(this.props.position['a3'], 'black', 'a3')}
    </div>
    <div className="board-row4">{this.renderSquare(this.props.position['h4'], 'black', 'h4')}{this.renderSquare(this.props.position['g4'], 'white', 'g4')}{this.renderSquare(this.props.position['f4'], 'black', 'f4')}{this.renderSquare(this.props.position['e4'], 'white', 'e4')}{this.renderSquare(this.props.position['d4'], 'black', 'd4')}{this.renderSquare(this.props.position['c4'], 'white', 'c4')}{this.renderSquare(this.props.position['b4'], 'black', 'b4')}{this.renderSquare(this.props.position['a4'], 'white', 'a4')}
    </div>
    <div className="board-row5">{this.renderSquare(this.props.position['h5'], 'white', 'h5')}{this.renderSquare(this.props.position['g5'], 'black', 'g5')}{this.renderSquare(this.props.position['f5'], 'white', 'f5')}{this.renderSquare(this.props.position['e5'], 'black', 'e5')}{this.renderSquare(this.props.position['d5'], 'white', 'd5')}{this.renderSquare(this.props.position['c5'], 'black', 'c5')}{this.renderSquare(this.props.position['b5'], 'white', 'b5')}{this.renderSquare(this.props.position['a5'], 'black', 'a5')}
    </div>
    <div className="board-row6">{this.renderSquare(this.props.position['h6'], 'black', 'h6')}{this.renderSquare(this.props.position['g6'], 'white', 'g6')}{this.renderSquare(this.props.position['f6'], 'black', 'f6')}{this.renderSquare(this.props.position['e6'], 'white', 'e6')}{this.renderSquare(this.props.position['d6'], 'black', 'd6')}{this.renderSquare(this.props.position['c6'], 'white', 'c6')}{this.renderSquare(this.props.position['b6'], 'black', 'b6')}{this.renderSquare(this.props.position['a6'], 'white', 'a6')}
    </div>
    <div className="board-row7">{this.renderSquare(this.props.position['h7'], 'white', 'h7')}{this.renderSquare(this.props.position['g7'], 'black', 'g7')}{this.renderSquare(this.props.position['f7'], 'white', 'f7')}{this.renderSquare(this.props.position['e7'], 'black', 'e7')}{this.renderSquare(this.props.position['d7'], 'white', 'd7')}{this.renderSquare(this.props.position['c7'], 'black', 'c7')}{this.renderSquare(this.props.position['b7'], 'white', 'b7')}{this.renderSquare(this.props.position['a7'], 'black', 'a7')}
    </div>
    <div className="board-row8">{this.renderSquare(this.props.position['h8'], 'black', 'h8')}{this.renderSquare(this.props.position['g8'], 'white', 'g8')}{this.renderSquare(this.props.position['f8'], 'black', 'f8')}{this.renderSquare(this.props.position['e8'], 'white', 'e8')}{this.renderSquare(this.props.position['d8'], 'black', 'd8')}{this.renderSquare(this.props.position['c8'], 'white', 'c8')}{this.renderSquare(this.props.position['b8'], 'black', 'b8')}{this.renderSquare(this.props.position['a8'], 'white', 'a8')}
    </div>
  </div>
    )
  }
}


    // <div className="board-row8">{this.renderSquare(this.props.position['a8'], 'white', 'a8')}{this.renderSquare(this.props.position['b8'], 'black', 'b8')}{this.renderSquare(this.props.position['c8'], 'white', 'c8')}{this.renderSquare(this.props.position['d8'], 'black', 'd8')}{this.renderSquare(this.props.position['e8'], 'white', 'e8')}{this.renderSquare(this.props.position['f8'], 'black', 'f8')}{this.renderSquare(this.props.position['g8'], 'white', 'g8')}{this.renderSquare(this.props.position['h8'], 'black', 'h8')}
    // </div>
    // <div className="board-row7">{this.renderSquare(this.props.position['a7'], 'black', 'a7')}{this.renderSquare(this.props.position['b7'], 'white', 'b7')}{this.renderSquare(this.props.position['c7'], 'black', 'c7')}{this.renderSquare(this.props.position['d7'], 'white', 'd7')}{this.renderSquare(this.props.position['e7'], 'black', 'e7')}{this.renderSquare(this.props.position['f7'], 'white', 'f7')}{this.renderSquare(this.props.position['g7'], 'black', 'g7')}{this.renderSquare(this.props.position['h7'], 'white', 'h7')}
    // </div>
    // <div className="board-row6">{this.renderSquare(this.props.position['a6'], 'white', 'a6')}{this.renderSquare(this.props.position['b6'], 'black', 'b6')}{this.renderSquare(this.props.position['c6'], 'white', 'c6')}{this.renderSquare(this.props.position['d6'], 'black', 'd6')}{this.renderSquare(this.props.position['e6'], 'white', 'e6')}{this.renderSquare(this.props.position['f6'], 'black', 'f6')}{this.renderSquare(this.props.position['g6'], 'white', 'g6')}{this.renderSquare(this.props.position['h6'], 'black', 'h6')}
    // </div>
    // <div className="board-row5">{this.renderSquare(this.props.position['a5'], 'black', 'a5')}{this.renderSquare(this.props.position['b5'], 'white', 'b5')}{this.renderSquare(this.props.position['c5'], 'black', 'c5')}{this.renderSquare(this.props.position['d5'], 'white', 'd5')}{this.renderSquare(this.props.position['e5'], 'black', 'e5')}{this.renderSquare(this.props.position['f5'], 'white', 'f5')}{this.renderSquare(this.props.position['g5'], 'black', 'g5')}{this.renderSquare(this.props.position['h5'], 'white', 'h5')}
    // </div>
    // <div className="board-row4">{this.renderSquare(this.props.position['a4'], 'white', 'a4')}{this.renderSquare(this.props.position['b4'], 'black', 'b4')}{this.renderSquare(this.props.position['c4'], 'white', 'c4')}{this.renderSquare(this.props.position['d4'], 'black', 'd4')}{this.renderSquare(this.props.position['e4'], 'white', 'e4')}{this.renderSquare(this.props.position['f4'], 'black', 'f4')}{this.renderSquare(this.props.position['g4'], 'white', 'g4')}{this.renderSquare(this.props.position['h4'], 'black', 'h4')}
    // </div>
    // <div className="board-row3">{this.renderSquare(this.props.position['a3'], 'black', 'a3')}{this.renderSquare(this.props.position['b3'], 'white', 'b3')}{this.renderSquare(this.props.position['c3'], 'black', 'c3')}{this.renderSquare(this.props.position['d3'], 'white', 'd3')}{this.renderSquare(this.props.position['e3'], 'black', 'e3')}{this.renderSquare(this.props.position['f3'], 'white', 'f3')}{this.renderSquare(this.props.position['g3'], 'black', 'g3')}{this.renderSquare(this.props.position['h3'], 'white', 'h3')}
    // </div>
    // <div className="board-row2">{this.renderSquare(this.props.position['a2'], 'white', 'a2')}{this.renderSquare(this.props.position['b2'], 'black', 'b2')}{this.renderSquare(this.props.position['c2'], 'white', 'c2')}{this.renderSquare(this.props.position['d2'], 'black', 'd2')}{this.renderSquare(this.props.position['e2'], 'white', 'e2')}{this.renderSquare(this.props.position['f2'], 'black', 'f2')}{this.renderSquare(this.props.position['g2'], 'white', 'g2')}{this.renderSquare(this.props.position['h2'], 'black', 'h2')}
    // </div>
    // <div className="board-row1">{this.renderSquare(this.props.position['a1'], 'black', 'a1')}{this.renderSquare(this.props.position['b1'], 'white', 'b1')}{this.renderSquare(this.props.position['c1'], 'black', 'c1')}{this.renderSquare(this.props.position['d1'], 'white', 'd1')}{this.renderSquare(this.props.position['e1'], 'black', 'e1')}{this.renderSquare(this.props.position['f1'], 'white', 'f1')}{this.renderSquare(this.props.position['g1'], 'black', 'g1')}{this.renderSquare(this.props.position['h1'], 'white', 'h1')}
    // </div>

class Board extends Component {

  piecesPictures = {
    'bRook': './static/bRook.png',
    'bKnight': './static/bKnight.png',
    'bPawn': './static/bPawn.png',
    'bBishop': './static/bBishop.png',
    'bKing': './static/bKing.png',
    'bQueen': './static/bQueen.png',
    'wRook': './static/wRook.png',
    'wPawn': './static/wPawn.png',
    'wBishop': './static/wBishop.png',
    'wKing': './static/wKing.png',
    'wQueen': './static/wQueen.png',
    'wKnight': './static/wKnight.png'
  }

  render() {
    return (
      this.props.whiteAtBottom ? <WhiteAtBottomBoard piecesPictures={this.piecesPictures} position={this.props.position} onClick={this.props.onClick} onMouseUp={this.props.onMouseUp} whiteIsNext={this.props.whiteIsNext} availableMoves={this.props.availableMoves} resigned={this.props.resigned}/> 
      : <BlackAtBottomBoard piecesPictures={this.piecesPictures} position={this.props.position} onClick={this.props.onClick} onMouseUp={this.props.onMouseUp} whiteIsNext={this.props.whiteIsNext} availableMoves={this.props.availableMoves} resigned={this.props.resigned}/>
    )
  }


}

Board.propTypes = {
  position: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
}

module.exports = Board