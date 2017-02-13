import { SHOW_RESIGN_PANEL, HIDE_RESIGN_PANEL, SHOW_NEW_GAME_POPUP, HIDE_NEW_GAME_POPUP, RESIGN, RESET_UI, CHANGE_POPUP_LINK, CHANGE_BACKGROUND, SHOW_USERNAME_INPUT, HIDE_USERNAME_INPUT, UPDATE_USERNAME } from '../actions'

const initialUIState = {
    showResignPanel: false,
    showNewGamePopup: false,
    newGamePopupLinksTo: 'engine',
    analysisMode: false,
    lightBackground: true,
    showUsernameInput: false,
    username: 'username',
}

function ui(state=initialUIState, action) {
    switch(action.type){
        case RESET_UI:
            return Object.assign({}, state, {
                showResignPanel: false,
                showNewGamePopup: false,
                newGamePopupLinksTo: 'engine',
                analysisMode: false,
                showUsernameInput: false,
            })
        case SHOW_RESIGN_PANEL:
            return Object.assign({}, state, {
                showResignPanel: true,
            })
        case HIDE_RESIGN_PANEL:
            return Object.assign({}, state, {
                showResignPanel: false,
            })
        case SHOW_NEW_GAME_POPUP:
            return Object.assign({}, state, {
                showNewGamePopup: true,
            })
        case HIDE_NEW_GAME_POPUP: 
            return Object.assign({}, state, {
                showNewGamePopup: false,
            })
        case CHANGE_POPUP_LINK:
            return Object.assign({}, state, {
                newGamePopupLinksTo: action.link !== 'network' ? action.link : '/',
            })
        case CHANGE_BACKGROUND:
            return Object.assign({}, state, {
                lightBackground: !state.lightBackground,
            })
        case SHOW_USERNAME_INPUT: 
            return Object.assign({}, state, {
                showUsernameInput: true,
            })
        case HIDE_USERNAME_INPUT:
            return Object.assign({}, state, {
                showUsernameInput: false,
            })
        case UPDATE_USERNAME:
            var username = action.username;
            if(action.username === ''){
                username = 'Player 1'
            }
            return Object.assign({}, state, {
                username: username,
            })
        default: 
            return state
    }
}

export default ui;