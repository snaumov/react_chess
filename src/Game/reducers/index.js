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
    pieceToMoveLetter: '',
    history: [],
    availableMoves: [],
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    whiteAtBottom: true,
    resigned: false,
    checkMate: false,
    moveNumber: 0,
}

function pieceToMoveLetterHelper(pieceName) {
    const unicodePictureCodes = {
        'K': '\u2654',
        'Q': '\u2655',
        'R': '\u2656',
        'B': '\u2657',
        'N': '\u2658'
    }

    return pieceName[1] === 'P' ? '' : pieceName[2] === 'n' ? unicodePictureCodes['N'] : unicodePictureCodes[pieceName[1]]
}

function position(state=initialState, action) {
    switch(action.type) {
        case START_NEW_GAME:
            return Object.assign({}, initialState, {
                chess: new Chess(),
                whiteAtBottom: action.color === "white" ? true : false
            })
        case UPDATE_START_SQUARE:
            return Object.assign({}, state, {
                startSquare: action.startSquare,
                pieceToMoveLetter: pieceToMoveLetterHelper(state.position[action.startSquare]),
                availableMoves: [].concat(state.chess.moves({square: action.startSquare}))
            })
        case MAKE_MOVE:
            console.log(state)
            //first, check if the side to move has been checkmated
            if (state.chess.in_checkmate()){
                return Object.assign({}, state, {
                    resigned: true,
                })
            }
            
            // create a variable for storing target square to show in history
            var endSquareForHistory = action.targetSquare;

            //create a copy of current position and update it
            var newPosition = Object.assign({}, state.position);
            var pieceToMove = newPosition[state.startSquare];

            if (newPosition[action.targetSquare] !== undefined){
                if(state.pieceToMoveLetter === ''){
                    endSquareForHistory = state.startSquare[0] + 'x' + endSquareForHistory;
                } else {
                    endSquareForHistory = 'x' + endSquareForHistory;
                }              
            }

            newPosition[state.startSquare] = undefined;
            newPosition[action.targetSquare] = pieceToMove;

            //castling
            if (pieceToMove === 'wKing' && state.startSquare === 'e1'){
                if(action.targetSquare === 'g1') {
                    newPosition['h1'] = undefined;
                    newPosition['f1'] = 'wRook';
                    endSquareForHistory = 'O-O';                  
                } else if (action.targetSquare === 'c1') {
                    newPosition['a1'] = undefined;
                    newPosition['d1'] = 'wRook';
                    endSquareForHistory = 'O-O-O';
                }
            } else if (pieceToMove === 'bKing' && state.startSquare === 'e8') {
                if(action.targetSquare === 'g8') {
                    newPosition['h8'] = undefined;
                    newPosition['f8'] = 'bRook';
                    endSquareForHistory = 'O-O';                  
                } else if (action.targetSquare === 'c8') {
                    newPosition['a8'] = undefined;
                    newPosition['d8'] = 'bRook';
                    endSquareForHistory = 'O-O-O';
                }            
            }
            
            var newChess = Object.assign({}, state.chess);
            var fenBeforeMove = newChess.fen();
            newChess.move({from: state.startSquare, to: action.targetSquare});
            var fenAfterMove = newChess.fen();


            return Object.assign({}, state, {
                    position: newPosition,    
                    whiteIsNext: !state.whiteIsNext,
                    history: [...state.history.slice(0, state.moveNumber), {endSquare: endSquareForHistory[0] !== 'O' ? state.pieceToMoveLetter + endSquareForHistory : endSquareForHistory, position: newPosition, fen: fenAfterMove}],
                    chess: newChess,
                    fen: fenBeforeMove,
                    checkMate: newChess.in_checkmate(),
                    moveNumber: state.moveNumber + 1,
            })
        case RESIGN:
            return Object.assign({}, state, {
                resigned: true,
            })            
        case JUMP_TO:
            console.log(state.history[action.moveNumber], action.moveNumber)
            return Object.assign({}, state, {
                position: state.history[action.moveNumber]['position'],
                chess: new Chess(state.history[action.moveNumber]['fen']),
                moveNumber: action.moveNumber + 1,
            })
            
        default:
            return state
    }
}

export default position