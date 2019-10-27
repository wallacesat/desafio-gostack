export function inscriptionRequest(meetupId) {
  return {
    type: '@inscriptions/INSCRIPTION_REQUEST',
    payload: { meetupId },
  };
}

export function inscriptionSuccess(meetup) {
  return {
    type: '@inscriptions/INSCRIPTION_SUCCESS',
    payload: { meetup },
  };
}

export function inscriptionFailure() {
  return {
    type: '@inscriptions/INSCRIPTION_FAILURE',
  };
}

export function deleteInscriptionRequest(meetupId) {
  return {
    type: '@inscriptions/DELETE_INSCRIPTION_REQUEST',
    payload: { meetupId },
  };
}

export function deleteInscriptionSuccess(meetupId) {
  return {
    type: '@inscriptions/DELETE_INSCRIPTION_SUCCESS',
    payload: { meetupId },
  };
}

export function deleteInscriptionFailure() {
  return {
    type: '@inscriptions/DELETE_INSCRIPTION_FAILURE',
  };
}

export function listInscriptionRequest() {
  return {
    type: '@inscriptions/LIST_INSCRIPTION_REQUEST',
  };
}

export function listInscriptionSuccess(meetups) {
  return {
    type: '@inscriptions/LIST_INSCRIPTION_SUCCESS',
    payload: { meetups },
  };
}

export function listInscriptionFailure() {
  return {
    type: '@inscriptions/LIST_INSCRIPTION_FAILURE',
  };
}
