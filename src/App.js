import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import { Game, GameWithEngine, GameNewGameView } from './Game/containers/Game';
import { NewGamePanel, NewGamePanelInGameView } from './newGamePanel';
import './App.sass';

class AppMainView extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="newGamePanelWrapper">
                    <NewGamePanel />
                </div>
                <Game store={this.props.store}/>
            </div>
        )
    }
}

class AppInGameView extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="newGamePanelWrapper">
                    <NewGamePanelInGameView />
                </div>
                <div className="gameContainer">
                    <Game />
                </div>
            </div>
        )
    }
}

class AppNewGameView extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="newGamePanelWrapper">
                    <NewGamePanel />
                </div>
                <GameNewGameView />
            </div>
        )
    }
}

class TestView extends React.Component {
    render() {
        return (
            <div>Test</div>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <Router history = {hashHistory}>
                <Route path="/" component={AppMainView} />
                <Route path="/newgame" component={AppNewGameView} />
                <Route path="/game" component={AppInGameView} />
                <Route path="/test" component={TestView} />
            </Router>
        )
    };
}

export default App;