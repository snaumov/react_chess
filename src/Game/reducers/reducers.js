import { combineReducers } from 'redux'
import { MAKE_MOVE, UPDATE_START_SQUARE, JUMP_TO } from '../actions'
import Chess from 'chess.js'

const initialState = {
    chess: new Chess(),
    position: chess.board(),
    startSquare: '',
}


function position(state=initialState, action) {
    switch(action.type) {
        case UPDATE_START_SQUARE:
            return Object.assign({}, state, {
                startSquare: action.startSquare,
            })
        case MAKE_MOVE:
            return Object.assign({}, state, {
                    history: [...history, state.position],
                    position: state.position.move({from: state.startSquare, to: action.endSquare})
            })
            
        default:
            return state
    }
}

function history(state=[], action) {
    switch(action.type) {
        case JUMP_TO:
            return Object.assign({}, state, {
                position: history[action.moveNumber]
            })

        default:
            return state
    }


}

const rootReducer = combineReducers({
    position,
    history
})

export default rootReducer