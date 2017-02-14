import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateStartSquare, makeMove, jumpTo, startNewGame } from '../actions'
import { resetUI, changePopupLinksTo, hideResignPanel, hideNewGamePopup } from '../../UI/actions'
import { startNewNetworkGame } from '../../Arena/actions'
import Chess from 'chess.js';
import Board from '../components/chessBoard.js'
import MovesList from '../components/movesList.js'
import NewGamePopup from '../../UI/components/newGamePopup'
import GetMoveFromServer from '../../Engine/engine.js'

class GameComponent extends Component {
  constructor(props) {
    super(props)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.jumpTo = this.jumpTo.bind(this)
    this.onClickNewGame = this.onClickNewGame.bind(this)
    this.onClickNewNetworkGame = this.onClickNewNetworkGame.bind(this)
    this.handlePopupChange = this.handlePopupChange.bind(this)
  }

  onMouseDown(startSquare){
    this.props.dispatch(updateStartSquare(startSquare))
  }

  onMouseUp(endSquare) {
    this.props.dispatch(makeMove(endSquare))
  }

  jumpTo(move) {
    this.props.dispatch(jumpTo(move))
  }

  onClickNewGame(color){
    this.props.dispatch(startNewGame(color))
    this.props.dispatch(resetUI());
  }

  onClickNewNetworkGame(color) {
    this.props.dispatch(startNewNetworkGame(color, this.props.ui.username));
  }

  handlePopupChange(link){
    this.props.dispatch(changePopupLinksTo(link));
  }


  render() {
    const { positionToShow, whiteIsNext, availableMoves, history, whiteAtBottom, resigned } = this.props.position
    return (
      <div className="gameContainer">
        {this.props.ui.showNewGamePopup ? <NewGamePopup onClick={this.props.ui.newGamePopupLinksTo === '/' ? this.onClickNewNetworkGame : this.onClickNewGame} onChange={this.handlePopupChange} onCloseClick={() => this.props.dispatch(hideNewGamePopup())} newGamePopupLinksTo={this.props.ui.newGamePopupLinksTo} /> : undefined}
        <div className="chessBoard">
          <Board position={positionToShow} whiteIsNext={whiteIsNext} onClick={this.onMouseDown} availableMoves={availableMoves} onMouseUp={this.onMouseUp} whiteAtBottom={whiteAtBottom} resigned={resigned}/>
        </div>
        <MovesList history={history} onClick={this.jumpTo} currentMoveNumber={this.props.position.moveNumber}/>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    position: state.position,
    history: state.history,
    ui: state.ui,
  }
}

const Game = connect(mapStateToProps)(GameComponent)

export { GameComponent, Game };
