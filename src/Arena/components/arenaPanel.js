import React from 'react';

function ArenaPanelComponent(props) {
    return(
        <div className="arenaPanel">
            <h2>Arena</h2>
            {props.gameList}
        </div>
    )

}

export default ArenaPanelComponent