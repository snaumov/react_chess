import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { GameComponent } from '../../Game/containers/Game'
import { sendMoveToServer, getMoveFromServer, resignNetworkGame } from '../actions'

class GameArenaComponent extends GameComponent {
    constructor(props) {
        super(props);
        console.log(this.props, this.props.route)
    }

    componentDidMount() {
        this.props.router.setRouteLeaveHook(this.props.routes[0], () => {
            if (!this.props.arena.networkOpponentResigned){
                return 'Are you sure you want to leave the game? It will be resigned'
            }
        })    
        this.moveGetter = setInterval(() => this.props.dispatch(getMoveFromServer(this.props.arena.currentGameID, this.props.arena.currentMove)), 5000);
    
    }

    componentWillUnmount() {
        clearInterval(this.moveGetter);
        this.props.dispatch(resignNetworkGame(this.props.arena.currentGameID));
    }

    onMouseUp(endSquare) {
        this.props.dispatch(sendMoveToServer(this.props.arena.currentGameID, this.props.position.startSquare + endSquare))
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