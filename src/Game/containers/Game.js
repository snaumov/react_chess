import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateStartSquare, makeMove, jumpTo, startNewGame } from '../actions'
import { resetUI, changePopupLinksTo, hideResignPanel, hideNewGamePopup } from '../../UI/actions'
import Chess from 'chess.js';
import Board from '../components/chessBoard.js'
import MovesList from '../components/movesList.js'
import NewGamePopup from '../../UI/components/newGamePopup'
import GetMoveFromServer from '../../Engine/engine.js'

class GameComponent extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.jumpTo = this.jumpTo.bind(this)
    this.onClickNewGame = this.onClickNewGame.bind(this)
    this.handlePopupChange = this.handlePopupChange.bind(this)
  }

  onMouseDown(startSquare){
    console.log(startSquare);
    this.props.dispatch(updateStartSquare(startSquare))
  }

  onMouseUp(endSquare) {
    console.log(endSquare);
    this.props.dispatch(makeMove(endSquare))
  }

  jumpTo(move) {
    this.props.dispatch(jumpTo(move))
  }

  onClickNewGame(color){
    this.props.dispatch(startNewGame(color))
    this.props.dispatch(resetUI());
  }

  handlePopupChange(link){
    this.props.dispatch(changePopupLinksTo(link));
  }


  render() {
    const { position, whiteIsNext, availableMoves, history, whiteAtBottom, resigned } = this.props.position
    return (
      <div className="gameContainer">
        <div className="chessBoard">
          <Board position={position} whiteIsNext={whiteIsNext} onClick={this.onMouseDown} availableMoves={availableMoves} onMouseUp={this.onMouseUp.bind(this)} whiteAtBottom={whiteAtBottom} resigned={resigned}/>
        </div>
        {this.props.ui.showNewGamePopup ? <NewGamePopup onClick={this.onClickNewGame} onChange={this.handlePopupChange} onCloseClick={() => this.props.dispatch(hideNewGamePopup())} newGamePopupLinksTo={this.props.ui.newGamePopupLinksTo} /> : undefined}
        <MovesList history={history} onClick={this.jumpTo} currentMoveNumber={this.props.position.moveNumber}/>
      </div>
    )
  }
}

/*class GameNewGameViewComponent extends GameComponent {
  constructor(props) {
    super(props);
    this.onClickNewGame = this.onClickNewGame.bind(this)
    this.handlePopupChange = this.handlePopupChange.bind(this)
  }

  onClickNewGame(color){
    this.props.dispatch(startNewGame(color))
    this.props.dispatch(resetUI());
  }

  handlePopupChange(link){
    this.props.dispatch(changePopupLinksTo(link));
  }

  render() {
    const { position, whiteIsNext, availableMoves, history, whiteAtBottom, resigned } = this.props.position
    const { newGamePopupLinksTo } = this.props.ui
    return (
      <div className="gameContainer">
        <div className="chessBoard">
          <Board position={position} whiteIsNext={whiteIsNext} onClick={this.onMouseDown} availableMoves={availableMoves} onMouseUp={this.onMouseUp.bind(this)} whiteAtBottom={whiteAtBottom} resigned={resigned}/>
        </div>
        <NewGamePopup onClick={this.onClickNewGame} onChange={this.handlePopupChange} newGamePopupLinksTo={newGamePopupLinksTo}/>
        <MovesList history={history} onClick={this.jumpTo}/>
      </div>
    )
  }
}*/

const mapStateToProps = (state) => {
  console.log(state)
  return {
    position: state.position,
    history: state.history,
    ui: state.ui,
  }
}
// const mapDispatchToProps = (dispatch) => {
//   return {

//   }
// }

const Game = connect(mapStateToProps)(GameComponent)
//const GameNewGameView = connect(mapStateToProps)(GameNewGameViewComponent)

export { GameComponent, Game };
