import React, { Component } from 'react';

function MoveSquare(props){
    return (
        <div className="move">
            <span onClick={props.onClick}>{props.endSquare}</span>
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
                        <MoveSquare onClick={() => this.clickHandler(moveNumber)} endSquare={positionState['endSquare']} />
                    </div>

                );

            }else{

                return (
                    <MoveSquare onClick={() => this.clickHandler(moveNumber)} endSquare={positionState['endSquare']} />
                );
            }
                
        });

        return (
            <div className="movesList">
                <div className="movesHeader"></div>
                <div className="moves">{moves}</div>
            </div>
            
    );
        
    }
}

export default MovesList;