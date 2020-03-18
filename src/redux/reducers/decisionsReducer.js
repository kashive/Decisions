import { FETCH_DECISIONS_BEGIN, FETCH_DECISIONS_SUCCESS } from "../actionTypes";
import produce from "immer";

const initialState = {
  decisions: []
};

export function decisionsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DECISIONS_BEGIN: {
      return state;
    }
    case FETCH_DECISIONS_SUCCESS: {
      return produce(state, draft => {
        draft.decisions = action.payload.decisions;
      });
    }
    default:
      return state;
  }
}
