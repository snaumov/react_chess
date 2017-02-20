import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { GameComponent } from '../../Game/containers/Game'
import {getGameStateFromServerWS, sendMoveToServerWS, getOpponentNameFromServer, resignNetworkGameWS } from '../actions'
import Board from '../../Game/components/chessBoard.js'
import MovesList from '../../Game/components/movesList.js'
import NewGamePopup from '../../UI/components/newGamePopup'
import { hideNewGamePopup } from '../../UI/actions'

class GameArenaComponent extends GameComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.router.setRouteLeaveHook(this.props.routes[0], () => {
            if (!this.props.arena.networkOpponentResigned){
                return 'Are you sure you want to leave the game? It will be resigned'
            }
        }) 
        if (this.props.position.moveNumber === 0 && this.props.arena.opponentName === '') {
            this.props.dispatch(getOpponentNameFromServer(this.props.arena.currentGameID, this.props.position.whiteAtBottom ? 'black' : 'white'))   
        }
    
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props.arena.webSocket.onmessage, nextProps.arena.webSocket.onmessage);
        if(!this.props.arena.webSocket.onmessage && nextProps.arena.webSocket !== '') {
            this.props.dispatch(getGameStateFromServerWS(nextProps.arena.webSocket));
        }

    }

    onMouseUp(endSquare) {
        this.props.dispatch(sendMoveToServerWS(this.props.arena.webSocket, this.props.position.startSquare + endSquare))
    }

    render() {
        const { positionToShow, whiteIsNext, availableMoves, history, whiteAtBottom, resigned } = this.props.position
        return (
        <div className="gameContainer">
            {this.props.ui.showNewGamePopup ? <NewGamePopup onClick={this.props.ui.newGamePopupLinksTo === '/' ? this.onClickNewNetworkGame : this.onClickNewGame} onChange={this.handlePopupChange} onCloseClick={() => this.props.dispatch(hideNewGamePopup())} newGamePopupLinksTo={this.props.ui.newGamePopupLinksTo} /> : undefined}
            <div className="chessBoard">
                <Board position={positionToShow} whiteIsNext={whiteIsNext} onClick={this.onMouseDown} availableMoves={availableMoves} onMouseUp={this.onMouseUp} whiteAtBottom={whiteAtBottom} resigned={resigned}/>
            </div>
            <MovesList history={history} onClick={this.jumpTo} currentMoveNumber={this.props.position.moveNumber} whiteSideUsername={whiteAtBottom ? this.props.ui.username : this.props.arena.opponentName} blackSideUsername={whiteAtBottom ? this.props.arena.opponentName : this.props.ui.username}/>
        </div>
        )
    }
    
}


const mapStateToProps = (state) => {
    return {
        position: state.position,
        history: state.history,
        ui: state.ui,
        arena: state.arena        
    }
}

const GameArena = connect(mapStateToProps)(GameArenaComponent)

export default withRouter(GameArena);