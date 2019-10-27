import { Platform } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

const localhost = Platform.OS === 'ios' ? 'localhost' : '10.0.0.163';

if (__DEV__) {
  const tron = Reactotron.configure({ host: localhost })
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}
