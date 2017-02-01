import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import { Game, GameNewGameView } from './Game/containers/Game';
import GameWithEngine from './Game/containers/GameWithEngine';
import GameAnalysis from './Game/containers/GameAnalysis';
import { NewGamePanel, NewGamePanelInGameView } from './Game/components/newGamePanel';
import Header from './UI/components/header'
import './App.sass';

class AppMainView extends React.Component {
    render() {
        return (
            <div className="middleRow">
                <div className="newGamePanelWrapper">
                    <NewGamePanel />
                </div>
                <Game />
            </div>
        )
    }
}

class AppInGameView extends React.Component {
    render() {
        return (
            <div className="middleRow">
                <div className="newGamePanelWrapper">
                    <NewGamePanelInGameView />
                </div>
                <div className="gameContainer">
                    <GameWithEngine />
                </div>
            </div>
        )
    }
}

class AppAnalysisView extends React.Component {
    render() {
        return (
            <div className="middleRow">
                <div className="newGamePanelWrapper">
                    <NewGamePanelInGameView />
                </div>
                <div className="gameContainer">
                    <GameAnalysis />
                </div>
            </div>
        )
    }
}

class AppNewGameView extends React.Component {
    render() {
        return (
            <div className="middleRow">
                <div className="newGamePanelWrapper">
                    <NewGamePanel />
                </div>
                <GameNewGameView />
            </div>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Router history = {hashHistory}>
                    <Route path="/" component={AppMainView} />
                    <Route path="/newgame" component={AppNewGameView} />
                    <Route path="/engine" component={AppInGameView} />
                    <Route path="/analysis" component={AppAnalysisView} />
                </Router>
            </div>
        )
    };
}

export default App;