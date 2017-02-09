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
    gameList[newGuid] = {user: username, color: color};
    return newGuid;
}

var chooseExistingGame = (gameID, secondPlayer) => {
    switch (gameList[gameID]['color']) {
        case 'black':
            gamesInProcess[gameID] = { 'white': gameList[gameID]['user'], 'black': secondPlayer }
        case 'white':
            gamesInProcess[gameID] = { 'white': secondPlayer, 'black': gameList[gameID]['user'] }
        case 'random':
            var firstPlayerColor = ['black', 'white'][Math.floor(Math.random() * 2)];
            var secondPlayerColor = firstPlayerColor === 'white' ? 'black' : 'white';
            gamesInProcess[gameID] = { firstPlayerColor: gameList[gameID]['user'], secondPlayerColor : secondPlayer };
        
    }

    gameList[gameID] = undefined;

    return gamesInProcess[gameID][secondPlayer];
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
    console.log(req.query)
    if (req.query.create === 'true') {
        res.json(createNewGame(color=req.query.color, username=req.query.username));
        return
    } else if (req.query.choose === 'true') {
        res.json(chooseExistingGame(req.query.gameID, req.query.username))
    }
    res.json(gameList)

})



app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})