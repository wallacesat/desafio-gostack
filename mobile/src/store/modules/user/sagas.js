import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = { name, email, ...(rest.oldPassword ? rest : {}) };

    const response = yield call(api.put, 'users', profile);

    Alert.alert('Sucesso!', 'Seu perfil foi atualizado');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    const msg =
      err.response && err.response.data
        ? err.response.data.error
        : 'Confira seus dados!';
    Alert.alert('Erro ao atualizar', msg);
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
