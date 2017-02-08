export const UPDATE_GAME_LIST = 'UPDATE_GAME_LIST'

const ARENA_ADDR = 'http://localhost:4000/'

function updateGameList(gameList) {
    return {
        type: UPDATE_GAME_LIST,
        gameList,
    }
}

export function fetchGames() {
    return dispatch => {
        return fetch(ARENA_ADDR + 'gamelist')
            .then(response => response.json())
            .then(json => dispatch(updateGameList(json)))
    }
}