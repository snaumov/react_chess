export const SHOW_RESIGN_PANEL = 'SHOW_RESIGN_PANEL'
export const HIDE_RESIGN_PANEL = 'HIDE_RESIGN_PANEL'
export const RESET_UI = 'RESET_UI'
export const CHANGE_POPUP_LINK = 'CHANGE_POPUP_LINK'
export const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND'
export const SHOW_USERNAME_INPUT = 'SHOW_USERNAME_INPUT'
export const HIDE_USERNAME_INPUT = 'HIDE_USERNAME_INPUT'
export const UPDATE_USERNAME = 'UPDATE_USERNAME'

//UI
export function resetUI() {
    return {
        type: RESET_UI,
    }
}

export function showResignPanel() {
    return {
        type: SHOW_RESIGN_PANEL,
    }
}

export function hideResignPanel() {
    return {
        type: HIDE_RESIGN_PANEL,
    }
}

export function changePopupLinksTo(link) {
    return {
        type: CHANGE_POPUP_LINK,
        link: link,
    }
}

export function changeBackground(){
    return {
        type: CHANGE_BACKGROUND,
    }
}

export function showUsernameInput(){
    return {
        type: SHOW_USERNAME_INPUT,
    }
}

export function hideUsernameInput(){
    return {
        type: HIDE_USERNAME_INPUT,
    }
}

export function updateUsername(username) {
    return {
        type: UPDATE_USERNAME,
        username: username,
    }
}