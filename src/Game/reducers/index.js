import { combineReducers } from 'redux'
import { MAKE_MOVE, UPDATE_START_SQUARE, JUMP_TO, START_NEW_GAME, RESIGN } from '../actions'
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
    checkMate: false,
}


function position(state=initialState, action) {
    switch(action.type) {
        case START_NEW_GAME:
            return Object.assign({}, initialState, {
                chess: new Chess(),
                whiteAtBottom: action.color === "white" ? true : false
            })
        case UPDATE_START_SQUARE:
            console.log(state);
            return Object.assign({}, state, {
                startSquare: action.startSquare,
                availableMoves: [].concat(state.chess.moves({square: action.startSquare}))
            })
        case MAKE_MOVE:
            //first, check if the side to move has been checkmated
            if (state.chess.in_checkmate()){
                return Object.assign({}, state, {
                    resigned: true,
                })
            }

            var newPosition = Object.assign({}, state.position);
            var pieceToMove = newPosition[state.startSquare];
            newPosition[state.startSquare] = undefined;
            newPosition[action.targetSquare] = pieceToMove;

            //castling
            if (pieceToMove === 'wKing' && state.startSquare === 'e1'){
                if(action.targetSquare === 'g1') {
                    newPosition['h1'] = undefined;
                    newPosition['f1'] = 'wRook';                  
                } else if (action.targetSquare === 'c1') {
                    newPosition['a1'] = undefined;
                    newPosition['d1'] = 'wRook';
                }
            } else if (pieceToMove === 'bKing' && state.startSquare === 'e8') {
                if(action.targetSquare === 'g8') {
                    newPosition['h8'] = undefined;
                    newPosition['f8'] = 'bRook';                  
                } else if (action.targetSquare === 'c8') {
                    newPosition['a8'] = undefined;
                    newPosition['d8'] = 'bRook';
                }            
            }
            
            var newChess = Object.assign({}, state.chess);
            var newFen = newChess.fen();
            newChess.move({from: state.startSquare, to: action.targetSquare});

            return Object.assign({}, state, {
                    position: newPosition,    
                    whiteIsNext: !state.whiteIsNext,
                    history: [...state.history, {endSquare: action.targetSquare, position: newPosition}],
                    chess: newChess,
                    fen: newFen,
                    checkMate: newChess.in_checkmate(),
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

export default position