import { combineReducers } from 'redux';

import challenge from './challenge';

/**
 * 合并reducer
 */
const rootReducer = combineReducers({
    challengesReducer: challenge
});

export default rootReducer;