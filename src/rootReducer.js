import { combineReducers } from 'redux'
import position from './Game/reducers'
import ui from './UI/reducers'

const rootReducer = combineReducers({
    position,
    ui
})

export default rootReducer;