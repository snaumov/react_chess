import { startNewGame, makeMove, updateStartSquare, resign } from '../../Game/actions'

export const UPDATE_GAME_LIST = 'UPDATE_GAME_LIST'
export const START_NEW_NETWORK_GAME = 'START_NEW_NETWORK_GAME'
export const UPDATE_MY_GAME_ID = 'UPDATE_MY_GAME_ID'
export const UPDATE_MY_COLOR = 'UPDATE_MY_COLOR'
export const CHOOSE_EXISTING_NETWORK_GAME = 'CHOOSE_EXISTING_NETWORK_GAME'
export const UPDATE_CURRENT_GAME_ID = 'UPDATE_CURRENT_GAME_ID'
export const UPDATE_CURRENT_MOVE = 'UPDATE_CURRENT_MOVE'
export const RESIGN_NETWORK_GAME = 'RESIGN_NETWORK_GAME'


const ARENA_ADDR = 'http://localhost:4000/'

function updateGameList(gameList) {
    return {
        type: UPDATE_GAME_LIST,
        gameList,
    }
}

function updateMyGameID(id) {
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

function updateCurrentMove(move) {
    return {
        type: UPDATE_CURRENT_MOVE,
        move
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
                dispatch(updateMyGameID(json));
                dispatch(updateMyColor(color));
            })
    }
}

export function chooseExistingNetworkGame(gameID, username) {
    return dispatch => {
        return fetch(ARENA_ADDR + 'gamelist?choose=true&gameid=' + gameID + '&username=' + username)
            .then(response => response.json())
            .then(color => { 
                    dispatch(startNewGame(color));
                    dispatch(updateCurrentGameID(gameID));
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

export function getMoveFromServer(gameID, currentMove) {
    return dispatch => {
        return fetch(ARENA_ADDR + 'gamelist?getmove=true&gameid=' + gameID)
            .then(response => response.json())
            .then(move => { 
                console.log(move, move!== currentMove); 
                move !== currentMove ? ( 
                        dispatch(updateStartSquare(move.slice(0, 2))),
                        dispatch(makeMove(move.slice(2))),
                        dispatch(updateCurrentMove(move)) 
                    ) : undefined 
            })
    }
}

export function resignNetworkGame(color, gameID) {
    return dispatch => {
        return fetchGames(ARENA_ADDR + 'gamelist?resign=true&gameid=' + gameID + '&color=' + color)
            .then(response => response.json())
            .then(() => dispatch(resign()));
    }
}
