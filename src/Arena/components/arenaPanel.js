import React from 'react';
import { Link } from 'react-router'

function MyGamePile(props) {
    return (
        <div className="myGamePile" >
            <p className="color">{props.myColor}</p>
            {!props.myCallAccepted ? <span>rotator</span> : <Link to={'/arena/' + props.myGameID} onClick={props.onMyGamePileClick}>Play</Link>}
        </div>
    )   
}

function GamePile(props) {
    return (       
        <Link to={'/arena/' + props.gameID} onClick={() => props.onClick(props.gameID)}>
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
                { props.myGameID ? <MyGamePile myColor={props.myColor} onMyGamePileClick={props.onMyGamePileClick} myCallAccepted={props.myCallAccepted} myGameID={props.myGameID}/> : undefined }
                { Object.keys(props.gameList).map( key => 
                    key !== props.myGameID ? <GamePile key={key} opponentName={props.gameList[key]['user']} colorToPlay={props.gameList[key]['color']} gameID={key} onClick={props.onClick}/> : undefined
                        
                )}
            </div>
        </div>
    )

}

export default ArenaPanelComponent