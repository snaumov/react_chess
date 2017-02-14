import React from 'react';
import { connect } from 'react-redux'
import { GameComponent } from './Game'
import Board from '../components/chessBoard.js'
import MovesList from '../components/movesList.js'
import NewGamePopup from '../../UI/components/newGamePopup'
import { hideNewGamePopup } from '../../UI/actions'
import { jumpToAnalysisMode } from '../actions'

class GameAnalysisComponent extends GameComponent {
  constructor(props) {
    super(props);
    this.jumpToAnalysisMode = this.jumpToAnalysisMode.bind(this);
  }

  jumpToAnalysisMode(move) {
    this.props.dispatch(jumpToAnalysisMode(move))
  }

  render() {
    const { positionToShow, whiteIsNext, availableMoves, history, whiteAtBottom, resigned } = this.props.position
    return (
      <div className="gameContainer">
        {this.props.ui.showNewGamePopup ? <NewGamePopup onClick={this.onClickNewGame} onChange={this.handlePopupChange} onCloseClick={() => this.props.dispatch(hideNewGamePopup())} newGamePopupLinksTo={this.props.ui.newGamePopupLinksTo} /> : undefined}
        <div className="chessBoard">
          <Board position={positionToShow} whiteIsNext={whiteIsNext} onClick={this.onMouseDown} availableMoves={availableMoves} onMouseUp={this.onMouseUp.bind(this)} whiteAtBottom={whiteAtBottom} resigned={resigned} analysisMode={true}/>
        </div>
        <MovesList history={history} onClick={this.jumpToAnalysisMode} currentMoveNumber={this.props.position.moveNumber} analysisMode={true}/>
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