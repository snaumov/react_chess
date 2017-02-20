const guid = require('guid')
const express = require('express')  
const app = express()  
var expressWs = require('express-ws')(app);

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
        return
    } else if (req.query.getplayername === 'true') {
        res.json(getPlayerName(req.query.gameid, req.query.color));
        return
    }
    res.json(gameList)

})



app.ws('/ws/gamelist/:gameid', (ws, req) => {
    // ws.broadcast = function broadcast(data) {
    //     ws.clients.forEach(function each(client) {
    //         //if (client.readyState === WebSocket.OPEN) {
    //         client.send(data);
    //         //}
    //     });
    // };

    ws.on('connection', function(webSocket) {
        var id = Math.random();
        activeWSConnections[req.params['gameid']][id] = webSocket;
    })

    ws.on('message', msg => {
        console.log(msg, msg.length);
        if(msg.length === 4){
            makeMove(req.params['gameid'], msg);
            console.log(gamesInProcess[req.params['gameid']]['currentState']);

            for (var key in activeWSConnections[req.params['gameid']]){
                 setInterval(() => ws.send(JSON.stringify(gamesInProcess[req.params['gameid']]['currentState'])), 2000);
            }
            // ws.clients.forEach(function each(client) {
            //     setInterval(() => ws.send(JSON.stringify(gamesInProcess[req.params['gameid']]['currentState'])), 2000);
            // })
            
        }
    })
})

app.get('/gamelist/:gameid', (req, res) => {
    res.json(req.params);
})

// app.param('gameid', function(req, res, next, value){
//     res.json(value);
// })



app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})