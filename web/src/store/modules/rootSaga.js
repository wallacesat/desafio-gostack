import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import meetups from './meetups/sagas';

export default function* rootSaga() {
  return yield all([auth, user, meetups]);
}
