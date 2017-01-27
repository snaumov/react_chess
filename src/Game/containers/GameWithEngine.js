import { connect } from 'react-redux'
import { GameComponent } from './Game'
import { makeMove, engineMakesMove } from '../actions'

class GameWithEngineComponent extends GameComponent {
  constructor() {
    super();
  }

  onMouseUp(endSquare) {
    console.log(endSquare);
    this.props.dispatch(makeMove(endSquare));
    this.props.dispatch(engineMakesMove(this.props.position.fen, this.props.position.startSquare + endSquare))

  }

//   EngineMakesMove(startSquare, endSquare){
//     this.onMouseDown(startSquare);
//     this.onMouseUp(endSquare);
//   }
}

const mapStateToProps = (state) => {
  return {
    position: state.position,
    history: state.history
  }
}

const GameWithEngine = connect(mapStateToProps)(GameWithEngineComponent)

export default GameWithEngine;