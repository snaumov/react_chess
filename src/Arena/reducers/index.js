import { UPDATE_GAME_LIST, UPDATE_MY_GAME_ID, UPDATE_CURRENT_GAME_ID, UPDATE_CURRENT_MOVE } from '../actions'

const arenaInitState = {
    gameList: {},
    myGameID: '',
    myCallAccepted: false,
    myColor: 'white',
    currentGameID: '',
    currentMove: '',
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
                currentGameID: action.gameID
            })
        case 'UPDATE_CURRENT_MOVE': 
            return Object.assign({}, state, {
                currentMove: action.move,
            })
        default:
            return state
    }
}

export default arena;
