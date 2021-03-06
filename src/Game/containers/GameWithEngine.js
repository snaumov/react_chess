import React from 'react';
import Board from '../components/chessBoard.js'
import MovesList from '../components/movesList.js'
import { connect } from 'react-redux'
import { GameComponent } from './Game'
import { makeMove, engineMakesMove, updateShouldGetMove } from '../actions'
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

  componentDidMount() {
    if (this.props.position.shouldGetMoveAsBlack){
      console.log('insidemount')
        this.props.dispatch(updateShouldGetMove());
        this.props.dispatch(engineMakesMove(this.props.position.fen, ''))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.position.shouldGetMoveAsBlack ){
      console.log('insidereceive/update')
        this.props.dispatch(updateShouldGetMove());
        this.props.dispatch(engineMakesMove(nextProps.position.fen, ''))
    }
  }

  render() {
    const { positionToShow, whiteIsNext, availableMoves, history, whiteAtBottom, resigned } = this.props.position
    return (
      <div className="gameContainer">
        {this.props.ui.showNewGamePopup ? <NewGamePopup onClick={this.props.ui.newGamePopupLinksTo === '/' ? this.onClickNewNetworkGame : this.onClickNewGame} onChange={this.handlePopupChange} onCloseClick={() => this.props.dispatch(hideNewGamePopup())} newGamePopupLinksTo={this.props.ui.newGamePopupLinksTo} /> : undefined}
        <div className="chessBoard">
          <Board position={positionToShow} whiteIsNext={whiteIsNext} onClick={this.onMouseDown} availableMoves={availableMoves} onMouseUp={this.onMouseUp} whiteAtBottom={whiteAtBottom} resigned={resigned}/>
        </div>
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