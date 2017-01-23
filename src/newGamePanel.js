import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class NewGamePanel extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="NewGamePanel">
                <Link to="/newgame" className="newGameButton">New Game</Link>
            </div>
        )
    }
}

class NewGamePanelInGameView extends NewGamePanel {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="NewGamePanel">
                <button className="newGameButton">Resign</button>
            </div>
        )
    }
}

export { NewGamePanel, NewGamePanelInGameView };