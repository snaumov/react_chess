import React from 'react';
import Board from '../components/chessBoard.js'
import MovesList from '../components/movesList.js'
import { connect } from 'react-redux'
import { GameComponent } from './Game'
import { makeMove, engineMakesMove } from '../actions'
import NewGamePopup from '../../UI/components/newGamePopup'
import { hideNewGamePopup } from '../../UI/actions'

class GameWithEngineComponent extends GameComponent {
  constructor(props) {
    super(props);
  }

  onMouseUp(endSquare) {
    this.props.dispatch(makeMove(endSquare));
    this.props.dispatch(engineMakesMove(this.props.position.fen, this.props.position.startSquare + endSquare))

  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.position.whiteAtBottom && nextProps.position.moveNumber === 0){
        this.props.dispatch(engineMakesMove(nextProps.position.fen, ''))
    }
  }

  render() {
    const { position, whiteIsNext, availableMoves, history, whiteAtBottom, resigned } = this.props.position
    return (
      <div className="gameContainer">
        <div className="chessBoard">
          <Board position={position} whiteIsNext={whiteIsNext} onClick={this.onMouseDown} availableMoves={availableMoves} onMouseUp={this.onMouseUp} whiteAtBottom={whiteAtBottom} resigned={resigned}/>
        </div>
        {this.props.ui.showNewGamePopup ? <NewGamePopup onClick={this.props.ui.newGamePopupLinksTo === '/' ? this.onClickNewNetworkGame : this.onClickNewGame} onChange={this.handlePopupChange} onCloseClick={() => this.props.dispatch(hideNewGamePopup())} newGamePopupLinksTo={this.props.ui.newGamePopupLinksTo} /> : undefined}
        <MovesList history={history} onClick={this.jumpTo} currentMoveNumber={this.props.position.moveNumber} whiteSideUsername={whiteAtBottom ? this.props.ui.username : 'Engine'} blackSideUsername={whiteAtBottom ? 'Engine' : this.props.ui.username}/>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    position: state.position,
    history: state.history,
    ui: state.ui
  }
}

const GameWithEngine = connect(mapStateToProps)(GameWithEngineComponent)

export default GameWithEngine;