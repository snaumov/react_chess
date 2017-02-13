//var fetch = require('node-fetch');

const SERVER_ADDRESS = 'http://api.underwaterchess.com'
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
            return data['turn'].bestMove;
        })
    
    return bestMove;
    
}


export default GetMoveFromServer;