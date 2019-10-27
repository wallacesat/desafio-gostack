import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import inscriptions from './inscriptions/reducer';

export default combineReducers({ auth, user, inscriptions });
