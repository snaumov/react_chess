import { startNewGame, makeMove, updateStartSquare, resign } from '../../Game/actions'
import { resetUI } from '../../UI/actions'

export const UPDATE_GAME_LIST = 'UPDATE_GAME_LIST'
export const RESET_NETWORK_GAME_STATE = 'RESET_NETWORK_GAME_STATE'
export const START_NEW_NETWORK_GAME = 'START_NEW_NETWORK_GAME'
export const UPDATE_MY_GAME_ID = 'UPDATE_MY_GAME_ID'
export const UPDATE_MY_COLOR = 'UPDATE_MY_COLOR'
export const CHOOSE_EXISTING_NETWORK_GAME = 'CHOOSE_EXISTING_NETWORK_GAME'
export const UPDATE_CURRENT_GAME_ID = 'UPDATE_CURRENT_GAME_ID'
export const UPDATE_OPPONENT_NAME = 'UPDATE_OPPONENT_NAME'
export const UPDATE_CURRENT_MOVE = 'UPDATE_CURRENT_MOVE'
export const RESIGN_NETWORK_GAME = 'RESIGN_NETWORK_GAME'
export const NETWORK_OPPONENT_RESIGNED = 'NETWORK_OPPONENT_RESIGNED'


const ARENA_ADDR = 'http://localhost:4000/';
const ARENA_ADDR_WS = 'ws://localhost:4000/';

function updateGameList(gameList) {
    return {
        type: UPDATE_GAME_LIST,
        gameList,
    }
}

function resetNetworkGameState() {
    return {
        type: RESET_NETWORK_GAME_STATE,
    }
}

export function updateMyGameID(id) {
    return {
        type: UPDATE_MY_GAME_ID,
        id
    }
}

function updateMyColor(color) {
    return {
        type: UPDATE_MY_COLOR,
        color
    }
}

export function updateCurrentGameID(gameID) {
    return {
        type: UPDATE_CURRENT_GAME_ID,
        gameID,
    }
}

export function updateOpponentName(opponentName) {
    return {
        type: UPDATE_OPPONENT_NAME,
        opponentName,
    }
}

function updateCurrentMove(move) {
    return {
        type: UPDATE_CURRENT_MOVE,
        move
    }
}

function networkOpponentResigned() {
    return {
        type: NETWORK_OPPONENT_RESIGNED,
    }
}

export function fetchGames() {
    return dispatch => {
        return fetch(ARENA_ADDR + 'gamelist')
            .then(response => response.json())
            .then(json => dispatch(updateGameList(json)))
    }
}

export function startNewNetworkGame(color, username) {
    return dispatch => {
        return fetch(ARENA_ADDR + 'gamelist?create=true&color=' + color + '&username=' + username)
            .then(response => response.json())
            .then(json => {
                dispatch(resetNetworkGameState());
                dispatch(updateMyGameID(json));
                dispatch(updateMyColor(color));
                dispatch(resetUI());
            })
    }
}

export function chooseExistingNetworkGame(gameID, opponentName, username) {
    return dispatch => {
        return fetch(ARENA_ADDR + 'gamelist?choose=true&gameid=' + gameID + '&username=' + username)
            .then(response => response.json())
            .then(color => { 
                    dispatch(resetNetworkGameState());
                    dispatch(startNewGame(color));
                    dispatch(resetUI());
                    dispatch(updateCurrentGameID(gameID));
                    dispatch(updateOpponentName(opponentName));
            })
    }
}

export function sendMoveToServer(gameID, move) {
    return dispatch => {
        return fetch(ARENA_ADDR + 'gamelist?makemove=true&gameid=' + gameID + '&move=' + move)
            .then(() => {
                dispatch(makeMove(move.slice(2, 4)));
                dispatch(updateCurrentMove(move))
            });
    }
}

export function getOpponentNameFromServer(gameID, color) {
    return dispatch => {
        return fetch(ARENA_ADDR + 'gamelist?getplayername=true&gameid=' + gameID + '&color=' + color)
            .then(response => response.json())
            .then(name => {
                dispatch(updateOpponentName(name));
            })
    }
}

export function getMoveFromServer(gameID, currentMove) {
    return dispatch => {
        return fetch(ARENA_ADDR + 'gamelist?getmove=true&gameid=' + gameID)
            .then(response => response.json())
            .then((state) => { 
                if(!state['resigned']){
                    state['currentMove'] !== currentMove ? ( 
                        dispatch(updateStartSquare(state['currentMove'].slice(0, 2))),
                        dispatch(makeMove(state['currentMove'].slice(2))),
                        dispatch(updateCurrentMove(state['currentMove'])) 
                    ) : undefined 
                } else {
                    dispatch(networkOpponentResigned());
                    //dispatch(resign());
                }

            })
    }
}

var currentMoveCached = '';

export function sendMoveToServerWS(socket, move) {
    return dispatch => {
        socket.send(move);
        dispatch(makeMove(move.slice(2, 4)));
        dispatch(updateCurrentMove(move));
        currentMoveCached = move;
    }
}

export function getGameStateFromServerWS(socket) {
    return dispatch => {
        //var socket = new WebSocket(ARENA_ADDR_WS + 'ws/gamelist/?gameid=' + gameID);
        socket.onmessage = msg => {
            console.log(msg.data);
            var parsedMsg = JSON.parse(msg.data);
            console.log(JSON.parse(msg.data));
            if(!parsedMsg['resigned']) {
                if (parsedMsg['currentMove'] !== currentMoveCached ){
                    dispatch(updateStartSquare(parsedMsg['currentMove'].slice(0, 2)));
                    dispatch(makeMove(parsedMsg['currentMove'].slice(2)));
                    dispatch(updateCurrentMove(parsedMsg['currentMove'])) 
                    currentMoveCached = parsedMsg['currentMove'];
                }

            } else {
                dispatch(networkOpponentResigned());                
            }

        }
        // socket.onopen = function() {
        //     socket.send('test from client');
        // }
    }
}

export function resignNetworkGame(gameID) {
    return dispatch => {
        return fetch(ARENA_ADDR + 'gamelist?resign=true&gameid=' + gameID)
            .then(response => response.json())
            .then(dispatch(resign()));
    }
}
