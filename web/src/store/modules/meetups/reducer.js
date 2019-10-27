import produce from 'immer';

const INITIAL_STATE = { itens: null, loading: false };

export default function meetups(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetups/MEETUPS_REQUEST' ||
        '@meetups/MEETUP_UPDATE_REQUEST' ||
        '@meetups/CREATE_MEETUP_REQUEST' ||
        '@meetups/DELETE_MEETUP_REQUEST':
        draft.loading = true;
        break;
      case '@meetups/CREATE_MEETUP_SUCCESS':
        draft.itens = [...state.itens, action.payload.meetup];
        draft.loading = false;
        break;
      case '@meetups/MEETUPS_SUCCESS':
        draft.itens = action.payload.meetups;
        draft.loading = false;
        break;
      case '@meetups/MEETUP_UPDATE_SUCCESS': {
        const newState = state.itens.map(item =>
          item.id === Number(action.payload.id) ? action.payload.meetup : item
        );
        draft.itens = newState;
        draft.loading = false;
        break;
      }
      case '@meetups/DELETE_MEETUP_SUCCESS':
        draft.itens = state.itens.filter(
          item => item.id !== Number(action.payload.id)
        );
        draft.loading = false;
        break;
      case '@meetups/MEETUPS_FAILURE' ||
        '@meetups/MEETUP_UPDATE_FAILURE' ||
        '@meetups/CREATE_MEETUP_FAILURE' ||
        '@meetups/DELETE_MEETUP_FAILURE':
        draft.loading = false;
        break;
      case '@auth/SIGN_OUT':
        draft.itens = null;
        draft.loading = false;
        break;
      default:
    }
  });
}
