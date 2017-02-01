import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
    render() {
        return(
            <div className="header">
                <div className="logo">
                    <img src={require("./media/site_logo3.png")} alt="ReactLogo"/>
                    <p className="siteHeader">ReactChess</p>
                </div>
                <div className="headerControlElements">
                    <span>Theme</span>
                    <p>Username</p>
                </div>
            </div>
        )

    }
}

export default Header;