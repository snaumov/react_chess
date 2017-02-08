import { combineReducers } from 'redux'
import position from './Game/reducers'
import ui from './UI/reducers'
import arena from './Arena/reducers'

const rootReducer = combineReducers({
    position,
    ui,
    arena
})

export default rootReducer;