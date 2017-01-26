import React from 'react';
import ReactDOM from 'react-dom';


class NewGamePopup extends React.Component {
    render() {
        return(
            <div className="NewGamePopup">
                <h2>Create a game</h2>
                <select>
                    <option value="computer">Computer</option>
                    <option value="human">Human</option>
                </select>
                <div className="SidePicker">
                    <span className="black" style={{backgroundImage:"url(" + require('./static/bK.svg')}}></span>
                    <span className="random" style={{backgroundImage:"url(" + require('./static/wbK.svg')}}></span>
                    <span className="white" style={{backgroundImage:"url(" + require('./static/wK.svg')}}></span>
                </div>
            </div>
        )
    }
}

export default NewGamePopup;