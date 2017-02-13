//export const ON_MOUSE_DOWN_GET_AVAILABLE_MOVES = 'ON_MOUSE_DOWN_GET_AVAILABLE_MOVES'
import GetMoveFromServer from '../../Engine/engine'

export const UPDATE_START_SQUARE = 'UPDATE_START_SQUARE'
export const MAKE_MOVE = 'MAKE_MOVE'
export const JUMP_TO = 'JUMP_TO'
export const START_NEW_GAME = 'START_NEW_GAME'
export const RESIGN = 'RESIGN'
export const UPDATE_SHOULD_GET_MOVE = 'UPDATE_SHOULD_GET_MOVE'


// export function onMouseDownGetAvailableMoves(startSquare) {
//     return {
//         type: ON_MOUSE_DOWN_GET_AVAILABLE_MOVES,
//         startSquare
//     }
// }

export function updateStartSquare(square) {
    return {
        type: UPDATE_START_SQUARE,
        square,
        startSquare: square
    }
}

export function makeMove(targetSquare, isCastling=false) {
    return {
        type: MAKE_MOVE,
        targetSquare,
        targetSquare: targetSquare,
        isCastling: isCastling
    }
}

export function jumpTo(moveNumber) {
    return {
        type: JUMP_TO,
        moveNumber,
        moveNumber: moveNumber
    }
}

export function startNewGame(color) {
    return {
        type: START_NEW_GAME,
        color,
        color: color
    }
}

export function engineMakesMove(fen, humanMove) {
    return dispatch => {
        return GetMoveFromServer(fen, humanMove)
            .then(data => {
                dispatch(updateStartSquare(data.slice(0, 2)))
                dispatch(makeMove(data.slice(2)))
            })
    }

}

export function resign() {
    return {
        type: RESIGN,
    }
}

export function updateShouldGetMove() {
    return {
        type: UPDATE_SHOULD_GET_MOVE,
    }
}

