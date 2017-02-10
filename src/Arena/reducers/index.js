import { UPDATE_GAME_LIST, UPDATE_MY_GAME_ID } from '../actions'

const arenaInitState = {
    gameList: {},
    myGameID: '',
    myCallAccepted: false,
    myColor: 'white',
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
        default:
            return state
    }
}

export default arena;
