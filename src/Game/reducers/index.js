import { combineReducers } from 'redux'
import { MAKE_MOVE, UPDATE_START_SQUARE, JUMP_TO, START_NEW_GAME, SHOW_RESIGN_PANEL, HIDE_RESIGN_PANEL, RESIGN, RESET_UI } from '../actions'
import Chess from 'chess.js'

const initialState = {
    chess: new Chess(),
    position: {
        a1: 'wRook',
        b1: 'wKnight',
        c1: 'wBishop',
        d1: 'wQueen',
        e1: 'wKing',
        f1: 'wBishop',
        g1: 'wKnight',
        h1: 'wRook',
        a2: 'wPawn',
        b2: 'wPawn',
        c2: 'wPawn',
        d2: 'wPawn',
        e2: 'wPawn',
        f2: 'wPawn',
        g2: 'wPawn',
        h2: 'wPawn',
        a8: 'bRook',
        b8: 'bKnight',
        c8: 'bBishop',
        d8: 'bQueen',
        e8: 'bKing',
        f8: 'bBishop',
        g8: 'bKnight',
        h8: 'bRook',
        a7: 'bPawn',
        b7: 'bPawn',
        c7: 'bPawn',
        d7: 'bPawn',
        e7: 'bPawn',
        f7: 'bPawn',
        g7: 'bPawn',
        h7: 'bPawn',
        
    },
    whiteIsNext: true,
    startSquare: '',
    history: [],
    availableMoves: [],
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    whiteAtBottom: true,
    resigned: false,
}

const initialUIState = {
    showResignPanel: false,
}


function position(state=initialState, action) {
    switch(action.type) {
        case START_NEW_GAME:
            console.log(action.color);
            return Object.assign({}, initialState, {
                whiteAtBottom: action.color === "white" ? true : false
            })
        case UPDATE_START_SQUARE:
            return Object.assign({}, state, {
                startSquare: action.startSquare,
                availableMoves: [].concat(state.chess.moves({square: action.startSquare}))
            })
        case MAKE_MOVE:
            var newPosition = Object.assign({}, state.position);
            var pieceToMove = newPosition[state.startSquare];
            newPosition[state.startSquare] = undefined;
            newPosition[action.targetSquare] = pieceToMove;
            
            var newChess = Object.assign({}, state.chess);
            var newFen = newChess.fen();
            newChess.move({from: state.startSquare, to: action.targetSquare});
            return Object.assign({}, state, {
                    position: newPosition,    
                    whiteIsNext: !state.whiteIsNext,
                    history: [...state.history, {endSquare: action.targetSquare, position: newPosition}],
                    chess: newChess,
                    fen: newFen,
            })
        case RESIGN:
            return Object.assign({}, state, {
                resigned: true,
            })            
        case JUMP_TO:
            console.log(state.history[action.moveNumber], action.moveNumber)
            return Object.assign({}, state, {
                position: state.history[action.moveNumber]['position']
            })
            
        default:
            return state
    }
}

function ui(state=initialUIState, action) {
    switch(action.type){
        case(RESET_UI):
            return Object.assign({}, state, initialUIState)
        case(SHOW_RESIGN_PANEL):
            return Object.assign({}, state, {
                showResignPanel: true,
            })
        case(HIDE_RESIGN_PANEL):
            return Object.assign({}, state, {
                showResignPanel: false,
            })
        default: 
            return state
    }
}

const rootReducer = combineReducers({
    position,
    ui
})

export default rootReducer