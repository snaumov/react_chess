import UPDATE_GAME_LIST from '../actions'

const arenaInitState = {
    gameList: [],
}

function arena(state=arenaInitState, action) {
    switch(action.type) {
        case 'UPDATE_GAME_LIST':
            console.log('here2')
            return Object.assign({}, state, {
                gameList: action.gameList,
            })
        default:
            return state
    }
}

export default arena;
