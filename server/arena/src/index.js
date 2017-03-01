const guid = require('guid')
const express = require('express')  ;
const http = require('http');
const WebSocket = require('ws');
const url = require('url');
const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ 
    server, 
});

const port = 4000

var gameList = {}

var gamesInProcess = {}

var activeWSConnections = {}

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

var getPlayerName = (gameID, color) => {
    return gamesInProcess[gameID][color];
}

var resignGame = (gameID) => {
    gamesInProcess[gameID]['currentState']['resigned'] = true;
}

app.use(function (req, res, next) {
    var allowedOrigins = ['http://localhost:3000', 'https://snaumov.github.io'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.get('/', (req, res) => {  
  res.json(gameList)
})

app.get('/gamelist', (req, res) => {
    //console.log(gamesInProcess);
    if (req.query.create === 'true') {
        res.json(createNewGame(color=req.query.color, username=req.query.username));
        return
    } else if (req.query.choose === 'true') {
        res.json(chooseExistingGame(req.query.gameid, req.query.username))
        return
    } else if (req.query.getplayername === 'true') {
        res.json(getPlayerName(req.query.gameid, req.query.color));
        return
    }
    res.json(gameList)

})

wss.on('connection', (ws) => {
    console.log('upgrade_req', ws.upgradeReq.url);
    const gameId = ws.upgradeReq.url.slice(1);
    if (!activeWSConnections[gameId]) {
       activeWSConnections[gameId] = {};
    } 
    var id = Math.random();
    activeWSConnections[gameId][id] = ws;
    console.log('activeWSConnections', activeWSConnections)


    ws.on('message', msg => {
        console.log(msg, msg.length);
        if(msg.length === 4){
            makeMove(gameId, msg);

            for (var userId in activeWSConnections[gameId]){
                console.log(userId);
                activeWSConnections[gameId][userId].send(JSON.stringify(gamesInProcess[gameId]['currentState']));
                console.log('sentTo:', userId);
            }
        } else if (msg === 'resign') {
            console.log('resigned');
            resignGame(gameId);
            for (var userId in activeWSConnections[gameId]){
                console.log(userId);
                activeWSConnections[gameId][userId].send(JSON.stringify(gamesInProcess[gameId]['currentState']));
                console.log('sentTo:', userId);
            }
        }
})
})


app.get('/gamelist/:gameid', (req, res) => {
    res.json(req.params);
})




server.listen((process.env.PORT || port), (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})