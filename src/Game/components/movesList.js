import React, { Component } from 'react';

function MovesHeader(props) {
    return (
        <div className="movesHeader">
            <div className="playerNames">
                <span className="usernameField">{props.whiteSideUsername}</span> {!props.analysisMode ? <span className="headerVs">vs</span> : <span className="headerVs">Analysis</span> } <span className="usernameField">{props.blackSideUsername}</span>
            </div>
        </div>
    )
}

function MoveSquare(props){
    return (
        <div onClick={props.onClick} className={props.highlightMoveSquare ? "move highlightedSquare" : "move"} >
            <span>{props.endSquare}</span>
        </div>
    );
}

function IndexSquare(props) {
    return (
        <div className="indexSquare">{props.index}</div>
    )
}

class MovesList extends Component {
    clickHandler(value){
        this.props.onClick(value);
    }
    render() {
        const moves = this.props.history.map((positionState, moveNumber) => {
            if(moveNumber % 2 === 0){
                return (
                    <div className="moveWithIndex">
                        <IndexSquare index={moveNumber/2 + 1} />
                        <MoveSquare onClick={() => this.clickHandler(moveNumber)} endSquare={positionState['endSquare']} highlightMoveSquare={moveNumber === this.props.currentMoveNumber - 1} />
                    </div>

                );

            }else{

                return (
                    <MoveSquare onClick={() => this.clickHandler(moveNumber)} endSquare={positionState['endSquare']} highlightMoveSquare={moveNumber === this.props.currentMoveNumber - 1} />
                );
            }
                
        });

        return (
            <div className="movesList">
                <MovesHeader whiteSideUsername={this.props.whiteSideUsername} blackSideUsername={this.props.blackSideUsername} analysisMode={this.props.analysisMode}/>
                <div className="moves">{moves}</div>
            </div>
            
    );
        
    }
}

export default MovesList;