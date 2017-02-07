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



app.get('/', (req, res) => {  
  res.json(gameList)
})

app.get('/gameslist', (req, res) => {
    res.json(gameList)
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})