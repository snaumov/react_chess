import React from 'react';
import { connect } from 'react-redux'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import { Game } from './Game/containers/Game';
import GameWithEngine from './Game/containers/GameWithEngine';
import GameAnalysis from './Game/containers/GameAnalysis';
import GameArena from './Arena/containers/GameArena';
import { NewGamePanel, NewGamePanelInGameView, NewGamePanelInNetworkGameView } from './UI/components/newGamePanel';
import Header from './UI/components/header'
import './App.css';

class AppMainView extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="middleRow">
                    <NewGamePanel />
                    <Game />
                </div>                
            </div>
        )
    }
}

class AppInGameView extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="middleRow">
                    <NewGamePanelInGameView />
                    <GameWithEngine />
                </div>
            </div>
            
        )
    }
}

class AppAnalysisView extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="middleRow">
                    <NewGamePanelInGameView />
                    <GameAnalysis />
                </div>
            </div>
        )
    }
}

class AppArenaView extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="middleRow">
                    <NewGamePanelInNetworkGameView />
                    <GameArena gameID={this.props.params.gameID}/>
                </div>  
            </div>         
        )
    }
}


class AppComponent extends React.Component {
    render() {
        return (
            <div className={this.props.ui.lightBackground ? "App lightBackground" : "App darkBackground"}>
                <Router history={hashHistory}>
                    <Route path="/" component={AppMainView} />
                    <Route path="/engine" component={AppInGameView} />
                    <Route path="/analysis" component={AppAnalysisView} />
                    <Route path="/arena/:gameID" component={AppArenaView} />
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