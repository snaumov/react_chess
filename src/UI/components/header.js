import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { changeBackground, showUsernameInput, updateUsername } from '../actions'

class UserNameInput extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }   

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    handleChange(event) {
        this.props.onChange(event.target.value)
    }

    render(){
        return(
            <textarea onChange={this.handleChange} value={this.props.inputValue}></textarea>
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
                    <span className={this.props.ui.lightBackground ? "darkbulb" : "lightbulb"} onClick={() => this.props.dispatch(changeBackground())}></span>
                    {this.props.ui.showUsernameInput ? <UserNameInput onChange={(e) => this.props.dispatch(updateUsername(e))} inputValue={this.props.ui.username}/> : <p onClick={() => this.props.dispatch(showUsernameInput())}>Username</p> }
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