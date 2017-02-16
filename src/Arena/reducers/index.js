import { UPDATE_GAME_LIST, UPDATE_MY_GAME_ID, UPDATE_CURRENT_GAME_ID, UPDATE_CURRENT_MOVE, NETWORK_OPPONENT_RESIGNED, UPDATE_OPPONENT_NAME } from '../actions'

const ARENA_ADDR_WS = 'http://localhost:4000/ws/gamelist/'

const arenaInitState = {
    gameList: {},
    myGameID: '',
    myCallAccepted: false,
    myColor: 'white',
    currentGameID: '',
    opponentName: '',
    currentMove: '',
    networkOpponentResigned: false,
    webSocket: '',
}

function arena(state=arenaInitState, action) {
    switch(action.type) {
        case 'UPDATE_GAME_LIST':
            if (state.myGameID !== '' && Object.keys(action.gameList).indexOf(state.myGameID) === -1){
                return Object.assign({}, state, {
                    gameList: action.gameList,
                    myCallAccepted: true,
                })
            } else {
                return Object.assign({}, state, {
                  gameList: action.gameList,
                })
            }
        case 'RESET_NETWORK_GAME_STATE':
            return Object.assign({}, state, {
                myCallAccepted: false,
                myColor: 'white',
                currentGameID: '',
                opponentName: '',
                currentMove: '',
                networkOpponentResigned: false,
                webSocket: '',
            })
        case 'UPDATE_MY_GAME_ID':
            return Object.assign({}, state, {
                myGameID: action.id,
            })
        case 'UPDATE_MY_COLOR':
            return Object.assign({}, state, {
                myColor: action.color,
            })
        case 'UPDATE_CURRENT_GAME_ID':
            return Object.assign({}, state, {
                currentGameID: action.gameID,
                webSocket: new WebSocket(ARENA_ADDR_WS + action.gameID),
            })
        case 'UPDATE_OPPONENT_NAME':
            return Object.assign({}, state, {
                opponentName: action.opponentName,
            })
        case 'UPDATE_CURRENT_MOVE': 
            return Object.assign({}, state, {
                currentMove: action.move,
            })
        case 'NETWORK_OPPONENT_RESIGNED':
            return Object.assign({}, state, {
                networkOpponentResigned: true,
            })
        default:
            return state
    }
}

export default arena;
