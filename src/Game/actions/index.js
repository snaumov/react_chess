//export const ON_MOUSE_DOWN_GET_AVAILABLE_MOVES = 'ON_MOUSE_DOWN_GET_AVAILABLE_MOVES'
export const UPDATE_START_SQUARE = 'UPDATE_START_SQUARE'
export const MAKE_MOVE = 'MAKE_MOVE'
export const JUMP_TO = 'JUMP_TO'


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

export function makeMove(targetSquare) {
    return {
        type: MAKE_MOVE,
        targetSquare,
        targetSquare: targetSquare
    }
}

export function jumpTo(moveNumber) {
    return {
        type: JUMP_TO,
        moveNumber,
        moveNumber: moveNumber
    }
}

