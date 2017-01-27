import startNewGame from '../actions'

class GameNewGameViewComponent extends GameComponent {
  constructor(props) {
    super(props);
    this.onClickNewGame = this.onClickNewGame.bind(this)
  }

  onClickNewGame(color){
      this.props.dispatch(startNewGame)
  }

  render() {
    const { position, whiteIsNext, availableMoves, history } = this.props.position
    return (
      <div className="gameContainer">
        <div className="chessBoard">
          <Board position={position} whiteIsNext={whiteIsNext} onClick={this.onMouseDown} availableMoves={availableMoves} onMouseUp={this.onMouseUp.bind(this)}/>
        </div>
        <NewGamePopup onClick={this.onClickNewGame}/>
        <MovesList history={history} onClick={this.jumpTo}/>
      </div>
    )
  }

}