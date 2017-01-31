import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'

class Picker extends Component {
    render () {
        return (
                <select onChange={e => this.props.onChange(e.target.value)} >
                    <option value="engine">Computer</option>
                    <option value="analysis">Analysis board</option>
                </select>
        )
    }
}

class NewGamePopup extends React.Component {

    render() {
        return(
            <div className="NewGamePopup">
                <h2>Create a game</h2>
                <Picker onChange={e => this.props.onChange(e)} />
                <div className="SidePicker">
                    <Link to={this.props.newGamePopupLinksTo} className="black" onClick={() => this.props.onClick('black')}></Link>
                    <Link to={this.props.newGamePopupLinksTo} className="random" onClick={() => this.props.onClick(() => ['black', 'white'][Math.floor(Math.random() * 2)])}></Link>
                    <Link to={this.props.newGamePopupLinksTo} className="white" onClick={() => this.props.onClick('white')}></Link>
                </div>
            </div>
        )
    }
}

export default NewGamePopup;