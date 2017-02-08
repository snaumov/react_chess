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

class NewGamePopup extends Component {

    render() {
        return(
            <div className="newGamePopup">
                <div className="newGamePopupHeader">
                    <h2>Create new game</h2>
                    <i className="closeNewGamePopup" onClick={this.props.onCloseClick}></i>
                </div>
                <Picker onChange={e => this.props.onChange(e)} />
                <div className="SidePicker">
                    <div className="sideToPick">
                        <Link to={this.props.newGamePopupLinksTo} className="black" onClick={() => this.props.onClick('black')}></Link>
                        <p>Black side</p>
                    </div>
                    <div className="sideToPick">
                        <Link to={this.props.newGamePopupLinksTo} className="random" onClick={() => this.props.onClick(() => ['black', 'white'][Math.floor(Math.random() * 2)])}></Link>
                        <p>Random side</p>
                    </div>
                    <div className="sideToPick">
                        <Link to={this.props.newGamePopupLinksTo} className="white" onClick={() => this.props.onClick('white')}></Link>
                        <p>White side</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewGamePopup;