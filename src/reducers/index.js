import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import gameReducer from './game';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  gameState: gameReducer,
});

export default rootReducer;