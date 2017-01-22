import React from 'react';
import ReactDOM from 'react-dom';

class NewGamePanel extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="NewGamePanel">
                <button className="newGameButton">New Game</button>
            </div>
        )
    }
}

export { NewGamePanel };