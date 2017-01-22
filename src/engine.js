//var fetch = require('node-fetch');

const SERVER_ADDRESS = 'http://localhost:5000'
const STATUS_SUCCESS = 200;

function GetMoveFromServer(fen, move) {
    var address = SERVER_ADDRESS + '/game?fen=' + fen + '&move=' + move + '&format=json';
    var xhrFetch = fetch(address, {
        method: 'GET'
    })

    var bestMove = xhrFetch
        .then(function(response) {
            if (response.status !== STATUS_SUCCESS) {
                console.error('Failed to load resource. Error code: ' + response.status);
                return;
            }
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            return data['turn'].bestMove;
        })
    
    return bestMove;
    
}

//console.log(GetMoveFromServer('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 'e2e4'));

export default GetMoveFromServer;