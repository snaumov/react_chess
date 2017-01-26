import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateStartSquare, makeMove, jumpTo } from '../actions'
import Chess from 'chess.js';
import Board from '../components/chessBoard.js'
import MovesList from '../components/movesList.js'
import NewGamePopup from '../components/newGamePopup'
import GetMoveFromServer from '../../Engine/engine.js'

class GameComponent extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.jumpTo = this.jumpTo.bind(this)
  }

  onMouseDown(startSquare){
    console.log(startSquare);
    //this.setState({availableMoves: this.chess.moves({square: startSquare})})
    this.props.dispatch(updateStartSquare)
  }

  onMouseUp(endSquare) {
    console.log(endSquare);
    this.props.dispatch(makeMove)
  }

  jumpTo(move) {
    this.props.dispatch(jumpTo)
  }


  render() {
    const { position, whiteIsNext, availableMoves, history } = this.props
    console.log(position.get('a1'))
    return (
      <div className="gameContainer">
        <div className="chessBoard">
          <Board position={position} whiteIsNext={whiteIsNext} onClick={this.onMouseDown} availableMoves={availableMoves} onMouseUp={this.onMouseUp.bind(this)}/>
        </div>
        <MovesList history={history} onClick={this.jumpTo}/>
      </div>
    )
  }
}

class GameWithEngine extends GameComponent {
  constructor() {
    super();
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
  var fen = this.chess.fen();
  this.chess.move({from: this.startSquare, to: endSquare});
  GetMoveFromServer(fen, this.startSquare + endSquare).then((data) => {
    if (!this.state.whiteIsNext) {
      this.EngineMakesMove(data.slice(0, 2), data.slice(2))
    }
  });
  }

  EngineMakesMove(startSquare, endSquare){
    this.onMouseDown(startSquare);
    this.onMouseUp(endSquare);
  }
}

class GameNewGameView extends GameComponent {
  constructor() {
    super();
  }

  render() {

    return (
      <div className="gameContainer">
        <div className="chessBoard">
          <Board position={this.state.position} whiteIsNext={this.state.whiteIsNext} onClick={this.onMouseDown.bind(this)} availableMoves={this.state.availableMoves} onMouseUp={this.onMouseUp.bind(this)}/>
        </div>
        <NewGamePopup />
        <MovesList history={this.state.history} onClick={this.jumpTo.bind(this)}/>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    position: state.position,
    history: state.history
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {

//   }
// }

const Game = connect(mapStateToProps)(GameComponent)

export { Game, GameWithEngine, GameNewGameView };
