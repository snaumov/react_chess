import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import { Game, GameWithEngine } from './Game';
import { NewGamePanel } from './newGamePanel';
import './App.css';

class AppMainView extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="newGamePanelWrapper">
                    <NewGamePanel />
                </div>
                <div className="gameContainer">
                    <Game />
                </div>
            </div>
        )
    }
}

class AppInGameView extends React.Component {

}

class AppNewGameView extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="newGamePanelWrapper">
                    <div>test</div>
                </div>
                <div className="gameContainer">
                    <Game />
                </div>
            </div>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <Router history = {hashHistory}>
                <Route path="/" component={AppMainView}>
                    <IndexRoute component={AppMainView} />
                    <Route path="newgame" component={AppNewGameView} />
                    <Route path="game" component={AppInGameView} />
                </Route>
            </Router>
        )
    };
}

export default App;