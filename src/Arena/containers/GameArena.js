import React from 'react';
import { connect } from 'react-redux'
import { GameComponent } from '../../Game/containers/Game'

class GameArenaComponent extends GameComponent {
    constructor(props) {
        super(props);
        console.log(this.props.gameID);
    }

    
}


const mapStateToProps = (state) => {
    return {
        position: state.position,
        history: state.history,
        ui: state.ui        
    }
}

const GameArena = connect(mapStateToProps)(GameArenaComponent)

export default GameArena;