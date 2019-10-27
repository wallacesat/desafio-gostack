import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducers = persistReducer(
    {
      key: 'meetAppWSaturnino',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );
  return persistedReducers;
};
