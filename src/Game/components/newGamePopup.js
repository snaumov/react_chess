import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'


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
                    <Link to="/game" className="black" onClick={() => this.props.onClick('black')}></Link>
                    <Link to="/game" className="random" onClick={() => this.props.onClick(() => ['black', 'white'][Math.floor(Math.random() * 2)])}></Link>
                    <Link to="/game" className="white" onClick={() => this.props.onClick('white')}></Link>
                </div>
            </div>
        )
    }
}

export default NewGamePopup;