import React from 'react';
import { connect } from 'react-redux'
import { GameComponent } from './Game'
import Board from '../components/chessBoard.js'
import MovesList from '../components/movesList.js'
import NewGamePopup from '../../UI/components/newGamePopup'
import { hideNewGamePopup } from '../../UI/actions'

class GameAnalysisComponent extends GameComponent {

  render() {
    const { position, whiteIsNext, availableMoves, history, whiteAtBottom, resigned } = this.props.position
    return (
      <div className="gameContainer">
        <div className="chessBoard">
          <Board position={position} whiteIsNext={whiteIsNext} onClick={this.onMouseDown} availableMoves={availableMoves} onMouseUp={this.onMouseUp.bind(this)} whiteAtBottom={whiteAtBottom} resigned={resigned} analysisMode={true}/>
        </div>
        {this.props.ui.showNewGamePopup ? <NewGamePopup onClick={this.onClickNewGame} onChange={this.handlePopupChange} onCloseClick={() => this.props.dispatch(hideNewGamePopup())} newGamePopupLinksTo={this.props.ui.newGamePopupLinksTo} /> : undefined}
        <MovesList history={history} onClick={this.jumpTo}/>
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

const GameAnalysis = connect(mapStateToProps)(GameAnalysisComponent)

export default GameAnalysis;