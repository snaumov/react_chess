const guid = require('guid')

const express = require('express')  
const app = express()  
const port = 4000

var gameList = {

    1: {
        user: 'user1',
        color: 'black',
    },
    2: {
        user: 'user2',
        color: 'random',
    }

}

var gamesInProcess = {}

var createNewGame = (color, username) => {
    var newGuid = guid.raw();
    gameList[newGuid] = {user: username, color: color === 'white' ? 'black' : 'white'};
    return newGuid;
}

var chooseExistingGame = (gameID, secondPlayer) => {
    var returnColor = 'white'
    switch (gameList[gameID]['color']) {
        case 'black':
            gamesInProcess[gameID] = { 'white': gameList[gameID]['user'], 'black': secondPlayer, currentState: {currentMove: '', resigned: false} }
            returnColor = 'black'
            break;
        case 'white':
            gamesInProcess[gameID] = { 'white': secondPlayer, 'black': gameList[gameID]['user'], currentState: {currentMove: '', resigned: false} }
            returnColor = 'white';
            break;
        case 'random':
            var firstPlayerColor = ['black', 'white'][Math.floor(Math.random() * 2)];
            var secondPlayerColor = firstPlayerColor === 'white' ? 'black' : 'white';
            gamesInProcess[gameID] = { firstPlayerColor: gameList[gameID]['user'], secondPlayerColor : secondPlayer, currentState: {currentMove: '', resigned: false} };
            returnColor = secondPlayerColor;
            break;
        
    }

    gameList[gameID] = undefined;
    return returnColor;
}

var makeMove = (gameID, move) => {
    gamesInProcess[gameID]['currentState']['currentMove'] = move;
}

var getMove = (gameID) => {
    console.log(gameID, gamesInProcess[gameID])
    return gamesInProcess[gameID]['currentState']
}

var resignGame = (gameID) => {
    gamesInProcess[gameID]['currentState']['resigned'] = true;
}

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.get('/', (req, res) => {  
  res.json(gameList)
})

app.get('/gamelist', (req, res) => {
    console.log(gamesInProcess);
    if (req.query.create === 'true') {
        res.json(createNewGame(color=req.query.color, username=req.query.username));
        return
    } else if (req.query.choose === 'true') {
        res.json(chooseExistingGame(req.query.gameid, req.query.username))
        return
    } else if (req.query.makemove === 'true') {
        makeMove(req.query.gameid, req.query.move);
        res.sendStatus(200);
        return
    } else if (req.query.getmove === 'true') {
        res.json(getMove(req.query.gameid));
        return
    } else if (req.query.resign === 'true') {
        resignGame(req.query.gameid);
    }
    res.json(gameList)

})



app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})