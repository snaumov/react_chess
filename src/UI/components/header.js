import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { changeBackground, showUsernameInput, updateUsername, hideUsernameInput } from '../actions'

class UserNameInput extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props)
        //this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }   

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }


    render(){
        return(
            <textarea tabIndex="0" onBlur={ this.props.onBlur } defaultValue={this.props.inputValue}></textarea>
        )
    }
}

class HeaderComponent extends React.Component {
    
    render() {
        return(
            <div className="header">
                <div className="logo">
                    <img src={require("./media/site_logo.png")} alt="ReactLogo"/>
                    <p className="siteHeader">ReactChess</p>
                </div>
                <div className="headerControlElements">
                    {this.props.ui.showUsernameInput ? <UserNameInput inputValue={this.props.ui.username} onBlur={(e) => {this.props.dispatch(updateUsername(e.target.value));this.props.dispatch(hideUsernameInput())}}/> : <p onClick={() => this.props.dispatch(showUsernameInput())}>{this.props.ui.username}</p> }
                    <span className={this.props.ui.lightBackground ? "darkbulb" : "lightbulb"} onClick={() => this.props.dispatch(changeBackground())}></span>
                </div>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
  }
}

const Header = connect(mapStateToProps)(HeaderComponent)

export default Header;