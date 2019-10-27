import produce from 'immer';

const INITIAL_STATE = { itens: null, loading: true };

export default function inscriptions(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@inscriptions/INSCRIPTION_REQUEST' ||
        '@inscriptions/DELETE_INSCRIPTION_REQUEST' ||
        '@inscriptions/LIST_INSCRIPTION_REQUEST':
        draft.loading = true;
        break;
      case '@inscriptions/INSCRIPTION_SUCCESS': {
        draft.itens = [...(state.itens || []), action.payload.meetup];
        draft.loading = false;
        break;
      }
      case '@inscriptions/DELETE_INSCRIPTION_SUCCESS':
        draft.itens = state.itens.filter(
          item => item.id !== Number(action.payload.meetupId)
        );
        draft.loading = false;
        break;
      case '@inscriptions/LIST_INSCRIPTION_SUCCESS':
        draft.itens = action.payload.meetups;
        draft.loading = false;
        break;
      case '@inscriptions/DELETE_INSCRIPTION_FAILURE' ||
        '@inscriptions/INSCRIPTION_FAILURE' ||
        '@inscriptions/LIST_INSCRIPTION_FAILURE':
        draft.loading = false;
        break;
      default:
    }
  });
}
