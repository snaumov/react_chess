import { connect } from 'react-redux'
import { GameComponent } from './Game'
import { makeMove, engineMakesMove } from '../actions'

class GameWithEngineComponent extends GameComponent {
  constructor(props) {
    super(props);
    console.log(this.props)
    if (!this.props.position.whiteAtBottom){
        this.props.dispatch((engineMakesMove(this.props.position.fen, '')))
    }
  }

  onMouseUp(endSquare) {
    console.log(endSquare);
    this.props.dispatch(makeMove(endSquare));
    this.props.dispatch(engineMakesMove(this.props.position.fen, this.props.position.startSquare + endSquare))

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