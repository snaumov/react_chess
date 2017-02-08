import React from 'react';

function MyGamePile(props) {
    return (
        <div className="myGamePile">
            <p className="color">{props.colorToPlay}</p>
            <span>rotator</span>
        </div>
    )   
}

function GamePile(props) {
    console.log(props)
    return (
        <div className="gamePile">
            <p className="opponentName">{props.opponentName}</p>
            <p className="color">{props.colorToPlay}</p>
        </div>
    )
}

function ArenaPanelComponent(props) {
    return(
        <div className="arenaPanel">
            <h2>Arena</h2>
            <div className="gameList">
                props.showMyGame ? 
                {
                    Object.keys(props.gameList).map( (key) => (
                        <GamePile key={key} opponentName={props.gameList[key]['user']} colorToPlay={props.gameList[key]['color']} gameId={key}/>
                    )
                )}
            </div>
        </div>
    )

}

export default ArenaPanelComponent