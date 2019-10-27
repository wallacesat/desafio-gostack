import AsyncStorage from '@react-native-community/async-storage';
// import storage from 'redux-persist/lib/storage';

import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducers = persistReducer(
    {
      key: 'meetAppWSaturnino',
      storage: AsyncStorage,
      // storage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );
  return persistedReducers;
};
