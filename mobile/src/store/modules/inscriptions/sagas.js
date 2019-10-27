import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import {
  inscriptionSuccess,
  inscriptionFailure,
  deleteInscriptionSuccess,
  deleteInscriptionFailure,
  listInscriptionSuccess,
  listInscriptionFailure,
} from './actions';

export function* inscriptionRequest({ payload }) {
  try {
    const { meetupId: id } = payload;

    const response = yield call(api.post, `/inscriptions/${id}`);

    const { data } = response;

    Alert.alert('Sucesso!', 'Sua inscrição foi confirmada');
    yield put(inscriptionSuccess(data));
  } catch (err) {
    const msg =
      err.response && err.response.data
        ? err.response.data.error
        : 'Erro ao realizar inscrição';
    Alert.alert('Erro!', msg);
    yield put(inscriptionFailure());
  }
}

export function* deleteInscriptionRequest({ payload }) {
  try {
    const { meetupId: id } = payload;

    yield call(api.delete, `/inscriptions/${id}`);

    Alert.alert('Sucesso!', 'Sua inscrição foi cancelada');
    yield put(deleteInscriptionSuccess(id));
  } catch (err) {
    const msg =
      err.response && err.response.data
        ? err.response.data.error
        : 'Erro ao cancelar inscrição';
    Alert.alert('Erro!', msg);
    yield put(deleteInscriptionFailure());
  }
}

export function* listInscriptionRequest() {
  try {
    const response = yield call(api.get, 'inscriptions');

    yield put(listInscriptionSuccess(response.data));
  } catch (err) {
    const msg =
      err.response && err.response.data
        ? err.response.data.error
        : 'Erro ao carregar inscrições';
    Alert.alert('Erro!', msg);
    yield put(listInscriptionFailure());
  }
}

export default all([
  takeLatest('@inscriptions/INSCRIPTION_REQUEST', inscriptionRequest),
  takeLatest(
    '@inscriptions/DELETE_INSCRIPTION_REQUEST',
    deleteInscriptionRequest
  ),
  takeLatest('@inscriptions/LIST_INSCRIPTION_REQUEST', listInscriptionRequest),
]);
