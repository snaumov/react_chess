## React-Chess app

Chess game written in React

## Demo

https://snaumov.github.io/react_chess

## Description (a.k.a "ТЗ")

Chess app, written with React & Redux. 

Consists of 

1. Frontend JavaScript web-application
2. Backend Node.JS chess server

Features:

1. Play game with engine (api.underwaterchess.com is used)
2. Analysis mode (or play with human opponent on the same computer)
3. Network game (play with human player on another computer) 

React-Router is used to switch between different components, in total three routes are available

```
class AppComponent extends React.Component {
    render() {
        return (
            <div className={this.props.ui.lightBackground ? "App lightBackground" : "App darkBackground"}>
                <Router history = {browserHistory}>
                    <Route path="/" component={AppMainView} />
                    <Route path="/engine" component={AppInGameView} />
                    <Route path="/analysis" component={AppAnalysisView} />
                    <Route path="/arena/:gameID" component={AppArenaView} />
                </Router>
            </div>
        )
    };
}
```

Player can play only one game at a time

All three modes mainly consist of these features:

1. Can win by either opponent resignation or checkmate
2. Can resign (Network game will be resigned if player left the game page)


UI features:

1. Can see game history and navigate back and forth in time
2. Can change username

## Install instructions

Download archive, then

```
npm install
npm start
```

to install frontend application

```
cd server/arena
npm install 
node src/index.js
```

to install backend app

The backend up will run on http://localhost:4000, if needed, change the address for web-app at *src/Arena/actions/index.js: const ARENA_ADDR*

## Used Open source applications and libraries

1. [React](https://facebook.github.io/react/)
2. [Redux](http://redux.js.org)
3. [React-router](https://github.com/ReactTraining/react-router)
4. [chess.js] (https://github.com/jhlywa/chess.js)
5. [chess-api](https://github.com/ncksllvn/chess-api)
6. [express-js](http://expressjs.com/)
7. [webSockets](https://github.com/websockets/ws)

and other.

## Author

Stepan Naumov
