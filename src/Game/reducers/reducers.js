import { combineReducers } from 'redux'
import { MAKE_MOVE, UPDATE_START_SQUARE } from './actions'
import Chess from 'chess.js'

const initialState = {
    position: new Chess(),
    history: [],
    startSquare: '',
    availableMoves: []

}


function makeMove(state=initialState, action) {
    switch(action.type) {
        case UPDATE_START_SQUARE:
            return Object.assign({}, state, {
                startSquare: action.startSquare,
                availableMoves: position.moves(action.startSquare)
            })
        case MAKE_MOVE:
            return Object.assign({}, state, {
                    history: [...history, position],
                    position: position.move({from: state.startSquare, to: action.endSquare})
            })
            
        default:
            return state
    }
}

function jumpTo(state, action) {
    switch(action.type) {
        case JUMP_TO:
            return Object.assign({}, state, {
                position: history[action.moveNumber]
            })
    }
}

const rootReducer = combineReducers({
    makeMove,
    jumpTo
})

export default rootReducer