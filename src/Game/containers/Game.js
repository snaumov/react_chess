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
    this.props.dispatch(updateStartSquare(startSquare))
  }

  onMouseUp(endSquare) {
    console.log(endSquare);
    this.props.dispatch(makeMove(endSquare))
  }

  jumpTo(move) {
    this.props.dispatch(jumpTo(move))
  }


  render() {
    const { position, whiteIsNext, availableMoves, history } = this.props.position
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

class GameNewGameViewComponent extends GameComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { position, whiteIsNext, availableMoves, history } = this.props.position
    return (
      <div className="gameContainer">
        <div className="chessBoard">
          <Board position={position} whiteIsNext={whiteIsNext} onClick={this.onMouseDown} availableMoves={availableMoves} onMouseUp={this.onMouseUp.bind(this)}/>
        </div>
        <NewGamePopup />
        <MovesList history={history} onClick={this.jumpTo}/>
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
const GameNewGameView = connect(mapStateToProps)(GameNewGameViewComponent)

export { GameComponent, Game, GameNewGameView };
