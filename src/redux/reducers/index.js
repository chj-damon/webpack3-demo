import { combineReducers } from 'redux';

import room from './room';

/**
 * 合并reducer
 */
const rootReducer = combineReducers({
    roomsReducer: room
});

export default rootReducer;