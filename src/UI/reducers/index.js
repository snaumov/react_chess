import { SHOW_RESIGN_PANEL, HIDE_RESIGN_PANEL, SHOW_NEW_GAME_PANEL, HIDE_NEW_GAME_PANEL, RESIGN, RESET_UI, CHANGE_POPUP_LINK, CHANGE_BACKGROUND, SHOW_USERNAME_INPUT, HIDE_USERNAME_INPUT, UPDATE_USERNAME } from '../actions'

const initialUIState = {
    showResignPanel: false,
    showNewGamePanel: false,
    newGamePopupLinksTo: 'engine',
    analysisMode: false,
    lightBackground: true,
    showUsernameInput: false,
    username: 'username',
}

function ui(state=initialUIState, action) {
    switch(action.type){
        case RESET_UI:
            return Object.assign({}, state, initialUIState)
        case SHOW_RESIGN_PANEL:
            return Object.assign({}, state, {
                showResignPanel: true,
            })
        case HIDE_RESIGN_PANEL:
            return Object.assign({}, state, {
                showResignPanel: false,
            })
        case SHOW_NEW_GAME_PANEL:
            return Object.assign({}, state, {
                showNewGamePanel: true,
            })
        case HIDE_NEW_GAME_PANEL: 
            return Object.assign({}, state, {
                showNewGamePanel: false,
            })
        case CHANGE_POPUP_LINK:
            return Object.assign({}, state, {
                newGamePopupLinksTo: action.link,
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
            console.log(action.username);
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