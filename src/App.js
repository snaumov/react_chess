import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import { Game, GameNewGameView } from './Game/containers/Game';
import GameWithEngine from './Game/containers/GameWithEngine';
import GameAnalysis from './Game/containers/GameAnalysis';
import { NewGamePanel, NewGamePanelInGameView } from './UI/components/newGamePanel';
import Header from './UI/components/header'
import './App.sass';

class AppMainView extends React.Component {
    render() {
        return (
            <div className="middleRow">
                <NewGamePanel />
                <Game />
            </div>
        )
    }
}

class AppInGameView extends React.Component {
    render() {
        return (
            <div className="middleRow">
                <NewGamePanelInGameView />
                <GameWithEngine />
            </div>
        )
    }
}

class AppAnalysisView extends React.Component {
    render() {
        return (
            <div className="middleRow">
                <NewGamePanelInGameView />
                <GameAnalysis />
            </div>
        )
    }
}


class AppComponent extends React.Component {
    render() {
        return (
            <div className={this.props.ui.lightBackground ? "App lightBackground" : "App darkBackground"}>
                <Header />
                <Router history = {hashHistory}>
                    <Route path="/" component={AppMainView} />
                    <Route path="/engine" component={AppInGameView} />
                    <Route path="/analysis" component={AppAnalysisView} />
                </Router>
            </div>
        )
    };
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
  }
}

const App = connect(mapStateToProps)(AppComponent)

export default App;