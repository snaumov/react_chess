import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { resign, startNewGame } from '../../Game/actions'
import { showResignPanel, hideResignPanel, showNewGamePopup, hideNewGamePopup } from '../actions'
import { chooseExistingNetworkGame } from '../../Arena/actions'

import ArenaPanel from '../../Arena/containers/arenaPanelContainer'

function CheckMatePanel (props) {
    return (
        <div className="checkMatePanel">
            <p>CheckMate!</p>
        </div>
    )
}

function ResignPanel(props) {
    return (
        <div className="resignPanel">
            {!props.resigned ? 

                (
                    <div><p> Are you sure you want to resign? </p>
                        <div className="resignButtons">
                            <button className="resignButton" onClick={() => props.onResignClick()}>Yes</button>
                            <button className="resignButton" onClick={() => props.onCancelResignClick()}>No</button>
                        </div>
                    </div>
                ) : (
                    <p>{props.whiteAtBottom ? 'Black' : 'White'} won. Congratulations!</p> 
                    )
            }
        </div>
    );
    
}

class NewGamePanelComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onArenaPileClick = this.onArenaPileClick.bind(this);
    }

    onArenaPileClick(gameID) {
        console.log(gameID)
        this.props.dispatch(chooseExistingNetworkGame(gameID, this.props.ui.username));
    }

    render() {
        const { myGameID, myCallAccepted, myColor } = this.props.arena
        return (
            <div className="newGamePanel">
                <button className="newGameButton" onClick={() => this.props.dispatch(showNewGamePopup())}>New Game</button>
                <ArenaPanel onClick={this.onArenaPileClick} myGameID={myGameID} myCallAccepted={myCallAccepted} myColor={myColor}/>
            </div>
        )
    }

    
}

class NewGamePanelInGameViewComponent extends NewGamePanelComponent {
    constructor(props) {
        super(props);
        console.log(props)
    }

    onCancelResignClick() {
        this.props.dispatch(hideResignPanel());
    }

    onResignClick() {
        this.props.dispatch(resign());
    }

    render() {
        return (
            <div className="newGamePanel">
                {(!this.props.position.checkMate && !this.props.position.resigned) ?
                (
                    <button className="newGameButton" onClick={() => this.props.dispatch(showResignPanel())}>Resign</button>
                ) : 
                (
                     <button className="newGameButton" onClick={() => this.props.dispatch(showNewGamePopup())}>New Game</button>
                )
                }
                {this.props.position.checkMate ? <CheckMatePanel /> : undefined }
                {this.props.ui.showResignPanel ? <ResignPanel onResignClick={this.onResignClick.bind(this)} onCancelResignClick={this.onCancelResignClick.bind(this)} whiteAtBottom={this.props.position.whiteAtBottom} resigned={this.props.position.resigned}/> : undefined}
                <ArenaPanel onClick={this.onArenaPileClick} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    position: state.position,
    ui: state.ui,
    arena: state.arena,
  }
}


const NewGamePanel = connect(mapStateToProps)(NewGamePanelComponent);
const NewGamePanelInGameView = connect(mapStateToProps)(NewGamePanelInGameViewComponent);

export { NewGamePanel, NewGamePanelInGameView };