import React from 'react';
import { Link } from 'react-router'

function MyGamePile(props) {
    return (
        <div className="myGamePile">
            <p className="color">{props.colorToPlay}</p>
            <span>rotator</span>
        </div>
    )   
}

function GamePile(props) {
    return (
        
        <Link to={'/arena/' + props.gameId} onClick={() => props.onClick(props.gameID)}>
            <div className="gamePile">
                <p className="opponentName">{props.opponentName}</p>
                <p className="color">{props.colorToPlay}</p>
            </div>
        </Link>

    )
}

function ArenaPanelComponent(props) {
    return(
        <div className="arenaPanel">
            <h2>Arena</h2>
            <div className="gameList">
                {
                    Object.keys(props.gameList).map( (key) => (
                        <GamePile key={key} opponentName={props.gameList[key]['user']} colorToPlay={props.gameList[key]['color']} gameId={key} onClick={this.props.onClick}/>
                    )
                )}
            </div>
        </div>
    )

}

export default ArenaPanelComponent