import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { parseISO } from 'date-fns';

import api from '~/services/api';
import history from '~/services/history';

import {
  meetupsSuccess,
  meetupsFailure,
  meetupUpdateSuccess,
  meetupUpdateFailure,
  createMeetupSuccess,
  createMeetupFailure,
  deleteMeetupsSuccess,
  deleteMeetupsFailure,
} from './actions';

export function* meetupsRequest() {
  try {
    const response = yield call(api.get, '/meetups/my-meetups');

    const data = response.data.map(item => ({
      ...item,
      date: parseISO(item.date),
    }));

    yield put(meetupsSuccess(data));
  } catch (err) {
    toast.error(
      err.response && err.response.data
        ? err.response.data.error
        : 'Erro ao carregar meetups.'
    );
    yield put(meetupsFailure());
  }
}

export function* meetupUpdate({ payload }) {
  try {
    const { id, ...meetup } = payload.meetup;

    const response = yield call(api.put, `/meetups/${id}`, { ...meetup });

    yield put(
      meetupUpdateSuccess(
        {
          ...response.data,
          date: parseISO(response.data.date),
        },
        id
      )
    );

    toast.success('Meetup atualizado com sucesso.');
  } catch (err) {
    toast.error(
      err.response && err.response.data
        ? err.response.data.error
        : 'Erro ao atualizar meetup, verifique os dados!'
    );
    yield put(meetupUpdateFailure());
  }
}

export function* createMeetup({ payload }) {
  try {
    const { title, description, location, date, banner_id } = payload.meetup;

    const response = yield call(api.post, 'meetups', {
      title,
      description,
      location,
      date,
      banner_id,
    });

    yield put(
      createMeetupSuccess({
        ...response.data,
        date: parseISO(response.data.date),
      })
    );
    toast.success('Novo meetup criado com sucesso.');

    history.push('/dashboard');
  } catch (err) {
    toast.error(
      err.response && err.response.data
        ? err.response.data.error
        : 'Erro ao criar meetup.'
    );

    yield put(createMeetupFailure());
  }
}

export function* deleteMeetup({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `/meetups/${id}`);

    yield put(deleteMeetupsSuccess(id));
    toast.success('Meetup cancelado com sucesso');

    history.push('/dashboard');
  } catch (err) {
    toast.error(
      err.response && err.response.data
        ? err.response.data.error
        : 'Erro ao cancelar meetup.'
    );

    yield put(deleteMeetupsFailure());
  }
}

export default all([
  takeLatest('@meetups/MEETUPS_REQUEST', meetupsRequest),
  takeLatest('@meetups/MEETUP_UPDATE_REQUEST', meetupUpdate),
  takeLatest('@meetups/CREATE_MEETUP_REQUEST', createMeetup),
  takeLatest('@meetups/DELETE_MEETUP_REQUEST', deleteMeetup),
]);
