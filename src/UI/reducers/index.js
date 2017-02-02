import { SHOW_RESIGN_PANEL, HIDE_RESIGN_PANEL, RESIGN, RESET_UI, CHANGE_POPUP_LINK, CHANGE_BACKGROUND, SHOW_USERNAME_INPUT, UPDATE_USERNAME } from '../actions'

const initialUIState = {
    showResignPanel: false,
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
        case UPDATE_USERNAME:
            console.log(action.username);
            return Object.assign({}, state, {
                username: action.username,
            })
        default: 
            return state
    }
}

export default ui;