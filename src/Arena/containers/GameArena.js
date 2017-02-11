import React from 'react';
import { connect } from 'react-redux'
import { GameComponent } from '../../Game/containers/Game'
import { sendMoveToServer, getMoveFromServer } from '../actions'

class GameArenaComponent extends GameComponent {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    componentDidMount() {
        console.log('component mounted!')
        setInterval(() => this.props.dispatch(getMoveFromServer(this.props.arena.currentGameID, this.props.arena.currentMove)), 5000);
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

export default GameArena;