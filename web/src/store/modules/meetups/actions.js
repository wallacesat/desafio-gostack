export function meetupsRequest() {
  return {
    type: '@meetups/MEETUPS_REQUEST',
  };
}

export function meetupsSuccess(meetups) {
  return {
    type: '@meetups/MEETUPS_SUCCESS',
    payload: { meetups },
  };
}

export function meetupsFailure() {
  return {
    type: '@meetups/MEETUPS_FAILURE',
  };
}

export function meetupUpdateRequest(meetup) {
  return {
    type: '@meetups/MEETUP_UPDATE_REQUEST',
    payload: { meetup },
  };
}

export function meetupUpdateSuccess(meetup, id) {
  return {
    type: '@meetups/MEETUP_UPDATE_SUCCESS',
    payload: { meetup, id },
  };
}

export function meetupUpdateFailure() {
  return {
    type: '@meetups/MEETUP_UPDATE_FAILURE',
  };
}

export function createMeetupRequest(meetup) {
  return {
    type: '@meetups/CREATE_MEETUP_REQUEST',
    payload: { meetup },
  };
}

export function createMeetupSuccess(meetup) {
  return {
    type: '@meetups/CREATE_MEETUP_SUCCESS',
    payload: { meetup },
  };
}

export function createMeetupFailure() {
  return {
    type: '@meetups/CREATE_MEETUP_FAILURE',
  };
}

export function deleteMeetupsRequest(id) {
  return {
    type: '@meetups/DELETE_MEETUP_REQUEST',
    payload: { id },
  };
}

export function deleteMeetupsSuccess(id) {
  return {
    type: '@meetups/DELETE_MEETUP_SUCCESS',
    payload: { id },
  };
}

export function deleteMeetupsFailure() {
  return {
    type: '@meetups/DELETE_MEETUP_FAILURE',
  };
}
