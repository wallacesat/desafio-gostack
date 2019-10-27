import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import meetups from './meetups/reducer';

export default combineReducers({ auth, user, meetups });
